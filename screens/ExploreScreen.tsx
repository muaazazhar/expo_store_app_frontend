import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { ApiErrorBanner } from '@/components/api-feedback';
import { DebouncedPressable } from '@/components/debounced-pressable';
import { fabStackBottomPadding } from '@/components/floating-action-button';
import { ListEmptyPlaceholder } from '@/components/list-empty-placeholder';
import { ListLoadMoreFooter } from '@/components/list-load-more-footer';
import { PaginatedFlatList, paginatedListStyles } from '@/components/paginated-flat-list';
import { RemoteImage } from '@/components/remote-image';
import { ScreenHeader } from '@/components/screen-header';
import { SkeletonBlock } from '@/components/skeleton-block';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { usePaginatedInfiniteList } from '@/hooks/use-paginated-infinite-list';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useGetCategoryPagesInfiniteQuery } from '@/store/api/catalogApi';
import type { Category } from '@/types/domain';
import { getApiErrorDetails } from '@/utils/apiError';

function BrowseCategorySkeleton({ count = 4 }: { count?: number }) {
  const borderColor = useThemeColor({}, 'border');
  const surface = useThemeColor({}, 'surface');

  return (
    <View>
      {Array.from({ length: count }, (_, index) => (
        <ThemedView
          key={`browse-skeleton-${index}`}
          style={[styles.categoryCard, { borderColor, backgroundColor: surface }]}>
          <SkeletonBlock width={72} height={72} borderRadius={12} />
          <View style={styles.categoryCopy}>
            <SkeletonBlock width="55%" height={16} borderRadius={6} />
            <SkeletonBlock width="40%" height={12} borderRadius={6} />
          </View>
        </ThemedView>
      ))}
    </View>
  );
}

export default function ExploreScreen() {
  const categoriesQuery = useGetCategoryPagesInfiniteQuery();
  const { items: categories, isInitialLoading, loadMore, isFetchingNextPage } =
    usePaginatedInfiniteList(categoriesQuery);

  const borderColor = useThemeColor({}, 'border');
  const surface = useThemeColor({}, 'surface');
  const muted = useThemeColor({}, 'muted');
  const primary = useThemeColor({}, 'primary');

  const errorMessage = categoriesQuery.isError
    ? getApiErrorDetails(categoriesQuery.error, 'Could not load categories.').message
    : null;

  const openCategory = useCallback((categoryId: string, categoryName: string) => {
    router.push({
      pathname: '/category/[id]',
      params: { id: categoryId, name: categoryName },
    });
  }, []);

  const renderCategory = useCallback(
    ({ item }: { item: Category }) => (
      <DebouncedPressable
        onPress={() => openCategory(String(item.id), item.name)}
        style={({ pressed }) => [pressed && styles.pressed]}>
        <ThemedView style={[styles.categoryCard, { borderColor, backgroundColor: surface }]}>
          {item.imageUrl ? (
            <RemoteImage
              uri={item.imageUrl}
              style={styles.categoryImage}
              recyclingKey={`explore-category-${item.id}`}
            />
          ) : (
            <View style={[styles.categoryImagePlaceholder, { backgroundColor: borderColor }]}>
              <ThemedText type="defaultSemiBold" style={{ color: muted }}>
                {item.name.slice(0, 1).toUpperCase()}
              </ThemedText>
            </View>
          )}
          <View style={styles.categoryCopy}>
            <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
            <ThemedText style={{ color: muted }}>Browse products</ThemedText>
          </View>
          <ThemedText type="link" style={{ color: primary }}>
            Open
          </ThemedText>
        </ThemedView>
      </DebouncedPressable>
    ),
    [borderColor, muted, openCategory, primary, surface],
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <PaginatedFlatList
        data={categories}
        renderItem={renderCategory}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={loadMore}
        contentContainerStyle={[
          paginatedListStyles.contentWide,
          { paddingBottom: fabStackBottomPadding(2) },
        ]}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <ScreenHeader title="Browse" showBack={false} />
            <ThemedText style={{ color: muted }}>
              Shop by category. Tap a collection to see products.
            </ThemedText>
            <ApiErrorBanner
              title="Could not load categories"
              message={errorMessage}
              onRetry={() => void categoriesQuery.refetch()}
            />
          </View>
        }
        ListFooterComponent={<ListLoadMoreFooter visible={isFetchingNextPage} />}
        ListEmptyComponent={
          <ListEmptyPlaceholder
            isLoading={isInitialLoading}
            isError={categoriesQuery.isError}
            loadingSkeleton={<BrowseCategorySkeleton count={4} />}
            emptyLabel="No categories yet. Check back soon."
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  headerBlock: {
    gap: 8,
    marginBottom: 8,
  },
  categoryCard: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  categoryImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
  },
  categoryImagePlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryCopy: {
    flex: 1,
    gap: 2,
    minWidth: 0,
  },
  pressed: {
    opacity: 0.85,
  },
});
