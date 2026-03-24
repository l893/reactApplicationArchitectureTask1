import { useMemo, useTransition } from 'react';
import {
  useParams,
  Link,
  useSearchParams,
  Navigate,
  useLocation,
} from 'react-router-dom';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { ALLOWED_CATEGORIES } from '@entities/rick-morty';
import { EmptyState, ErrorState, LoadingState, SortControls } from '@shared/ui';
import { useInfiniteScroll } from '@features/infinite-scroll';
import { useCategoryPagination } from '@features/category-pagination';

export const CategoryPage = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const isValidCategory = ALLOWED_CATEGORIES.includes(category);
  const sort = searchParams.get('sort');

  const {
    items,
    hasNextPage,
    isInitialLoading,
    isLoadingMore,
    requestErrorMessage,
    loadPage,
    loadNextPage,
  } = useCategoryPagination({ category, isValidCategory });

  const sortedItems = useMemo(() => {
    if (!sort) return items;

    return [...items].sort((firstItem, secondItem) => {
      const firstCreatedAt = new Date(firstItem.created).getTime();
      const secondCreatedAt = new Date(secondItem.created).getTime();
      return sort === 'asc'
        ? firstCreatedAt - secondCreatedAt
        : secondCreatedAt - firstCreatedAt;
    });
  }, [items, sort]);

  const isInfiniteScrollEnabled =
    isValidCategory && hasNextPage && !isInitialLoading && !isLoadingMore;
  const loadMoreSentinelElementRef = useInfiniteScroll({
    isEnabled: isInfiniteScrollEnabled,
    onLoadMore: loadNextPage,
    rootMargin: '400px',
  });

  const [isSortPending, startSortTransition] = useTransition();

  const handleSortChange = (nextSort) => {
    startSortTransition(() => {
      setSearchParams((previousSearchParams) => {
        const nextSearchParams = new URLSearchParams(previousSearchParams);

        if (!nextSort) nextSearchParams.delete('sort');
        else nextSearchParams.set('sort', nextSort);

        return nextSearchParams;
      });
    });
  };

  if (!isValidCategory) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        {category}
      </Typography>

      <SortControls sort={sort} onChange={handleSortChange} />

      {requestErrorMessage ? (
        <Box sx={{ mb: 2 }}>
          <ErrorState
            message={`Failed to load data: ${requestErrorMessage}`}
            onRetry={() =>
              loadPage({ pageToLoad: 1, replaceExistingItems: true })
            }
            isRetryDisabled={isInitialLoading}
          />
        </Box>
      ) : null}

      {isInitialLoading ? <LoadingState message="Loading..." /> : null}

      {!isInitialLoading && !requestErrorMessage && items.length === 0 ? (
        <Box sx={{ mt: 2 }}>
          <EmptyState message="No items found." />
        </Box>
      ) : null}

      <List disablePadding>
        {sortedItems.map((item) => (
          <ListItemButton
            key={item.id}
            component={Link}
            to={{ pathname: String(item.id), search: location.search }}
            relative="path"
          >
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
      </List>

      <Stack spacing={1} sx={{ mt: 2 }}>
        {isSortPending ? (
          <Typography variant="body2" color="text.secondary">
            Sorting...
          </Typography>
        ) : null}
        {isLoadingMore ? (
          <Typography variant="body2" color="text.secondary">
            Loading more...
          </Typography>
        ) : null}
      </Stack>

      {hasNextPage ? (
        <Box ref={loadMoreSentinelElementRef} sx={{ height: 1 }} />
      ) : items.length > 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          End of list
        </Typography>
      ) : null}
    </>
  );
};
