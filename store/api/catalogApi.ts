import { baseApi } from '@/store/api/baseApi';
import { getApiBaseUrl } from '@/services/baseUrl';
import type { Category, Product } from '@/types/domain';

const apiBaseUrl = getApiBaseUrl();

function normalizeImagePath(path: string): string {
  // Backward-compatible fix for legacy backend responses missing /api prefix.
  if (/^\/?(products|categories)\/.+\/image$/i.test(path)) {
    return path.startsWith('/') ? `/api${path}` : `/api/${path}`;
  }
  return path;
}

function bytesToBase64(bytes: number[]): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const a = bytes[i] ?? 0;
    const b = bytes[i + 1] ?? 0;
    const c = bytes[i + 2] ?? 0;
    const triple = (a << 16) | (b << 8) | c;

    output += chars[(triple >> 18) & 63];
    output += chars[(triple >> 12) & 63];
    output += i + 1 < bytes.length ? chars[(triple >> 6) & 63] : '=';
    output += i + 2 < bytes.length ? chars[triple & 63] : '=';
  }
  return output;
}

function blobToDataUri(blob: unknown, mime: unknown): string | null {
  const mimeType = typeof mime === 'string' && mime.trim() ? mime.trim() : 'image/jpeg';

  // Backend may already send base64 string
  if (typeof blob === 'string' && blob.trim()) {
    const value = blob.trim();
    if (value.startsWith('data:image/')) return value;
    return `data:${mimeType};base64,${value}`;
  }

  // Node Buffer JSON form: { type: 'Buffer', data: number[] }
  if (
    blob &&
    typeof blob === 'object' &&
    'type' in (blob as Record<string, unknown>) &&
    (blob as Record<string, unknown>).type === 'Buffer' &&
    Array.isArray((blob as Record<string, unknown>).data)
  ) {
    const bytes = (blob as { data: number[] }).data;
    if (!bytes.length) return null;
    return `data:${mimeType};base64,${bytesToBase64(bytes)}`;
  }

  // Direct byte array form
  if (Array.isArray(blob) && blob.length > 0 && typeof blob[0] === 'number') {
    return `data:${mimeType};base64,${bytesToBase64(blob as number[])}`;
  }

  return null;
}

function toAbsoluteUrl(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim()) return null;
  const trimmed = normalizeImagePath(value.trim());
  if (trimmed.startsWith('data:image/')) return trimmed;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  const originMatch = apiBaseUrl.match(/^(https?:\/\/[^/]+)/);
  const origin = originMatch?.[1] ?? apiBaseUrl;
  return `${origin}${trimmed.startsWith('/') ? '' : '/'}${trimmed}`;
}

function normalizeCategory(raw: any): Category {
  const imageFromBlob = blobToDataUri(
    raw?.imageBlob ?? raw?.image_blob,
    raw?.imageMime ?? raw?.image_mime
  );
  const imageValue =
    imageFromBlob ??
    raw?.imageUrl ??
    raw?.image_url ??
    raw?.image ??
    raw?.imagePath ??
    raw?.image_path ??
    null;
  return {
    id: String(raw?.id ?? ''),
    name: String(raw?.name ?? ''),
    imageUrl: toAbsoluteUrl(imageValue),
  };
}

function normalizeProduct(raw: any): Product {
  const imageFromBlob = blobToDataUri(
    raw?.imageBlob ?? raw?.image_blob,
    raw?.imageMime ?? raw?.image_mime
  );
  const imageValue =
    imageFromBlob ??
    raw?.imageUrl ??
    raw?.image_url ??
    raw?.image ??
    raw?.imagePath ??
    raw?.image_path ??
    null;
  return {
    id: raw?.id,
    name: String(raw?.name ?? ''),
    price: raw?.price ?? 0,
    discountPercent: raw?.discountPercent ?? raw?.discount_percent ?? raw?.discount ?? null,
    categoryId: raw?.categoryId ?? raw?.category_id ?? null,
    category: raw?.category ? normalizeCategory(raw.category) : null,
    imageUrl: toAbsoluteUrl(imageValue),
  };
}

export const catalogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => '/api/categories',
      transformResponse: (response: unknown) => {
        const payload = Array.isArray(response) ? response : [];
        return payload.map(normalizeCategory);
      },
      providesTags: (result) =>
        result
          ? [
              { type: 'Category', id: 'LIST' },
              ...result.map((category) => ({ type: 'Category' as const, id: String(category.id) })),
            ]
          : [{ type: 'Category', id: 'LIST' }],
    }),
    createCategory: builder.mutation<Category, FormData | { name: string }>({
      query: (body) => ({
        url: '/api/categories',
        method: 'POST',
        body,
      }),
      transformResponse: (response: unknown) => normalizeCategory(response),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    updateCategory: builder.mutation<Category, { id: string; body: FormData | { name: string } }>({
      query: ({ id, body }) => ({
        url: `/api/categories/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: unknown) => normalizeCategory(response),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Category', id: 'LIST' },
        { type: 'Category', id: arg.id },
      ],
    }),
    deleteCategory: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/api/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Category', id: 'LIST' },
        { type: 'Category', id: arg.id },
      ],
    }),
    getProducts: builder.query<Product[], void>({
      query: () => '/api/products',
      transformResponse: (response: unknown) => {
        const payload = Array.isArray(response) ? response : [];
        return payload.map(normalizeProduct);
      },
      providesTags: (result) =>
        result
          ? [{ type: 'Product', id: 'LIST' }, ...result.map((product) => ({ type: 'Product' as const, id: String(product.id) }))]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    createProduct: builder.mutation<Product, FormData>({
      query: (body) => ({
        url: '/api/products',
        method: 'POST',
        body,
      }),
      transformResponse: (response: unknown) => normalizeProduct(response),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
    updateProduct: builder.mutation<Product, { id: string; body: FormData | { name?: string; price?: number; categoryId?: number } }>({
      query: ({ id, body }) => ({
        url: `/api/products/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: unknown) => normalizeProduct(response),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Product', id: 'LIST' },
        { type: 'Product', id: arg.id },
      ],
    }),
    deleteProduct: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/api/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Product', id: 'LIST' },
        { type: 'Product', id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = catalogApi;
