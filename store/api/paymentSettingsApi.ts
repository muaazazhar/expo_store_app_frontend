import { baseApi } from '@/store/api/baseApi';
import type { PaymentSettings } from '@/types/domain';

export const paymentSettingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicPaymentSettings: builder.query<PaymentSettings | null, void>({
      query: () => '/api/payment-settings/public',
      providesTags: [{ type: 'PaymentSettings', id: 'SINGLE' }],
    }),
    getAdminPaymentSettings: builder.query<PaymentSettings | null, void>({
      query: () => '/api/payment-settings',
      providesTags: [{ type: 'PaymentSettings', id: 'SINGLE' }],
    }),
    upsertPaymentSettings: builder.mutation<PaymentSettings, PaymentSettings>({
      query: (body) => ({
        url: '/api/payment-settings',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'PaymentSettings', id: 'SINGLE' }],
    }),
  }),
});

export const {
  useGetPublicPaymentSettingsQuery,
  useGetAdminPaymentSettingsQuery,
  useUpsertPaymentSettingsMutation,
} = paymentSettingsApi;
