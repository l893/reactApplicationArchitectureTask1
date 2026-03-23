import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchCategoryPage } from '@entities/rick-morty';
import { isAbortError } from '@shared/api';

export function useCategoryPagination({ category, isValidCategory }) {
  const activeRequestControllerRef = useRef(null);

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [requestErrorMessage, setRequestErrorMessage] = useState(null);

  const loadPage = useCallback(
    async ({ pageToLoad, replaceExistingItems }) => {
      if (!isValidCategory) return;

      activeRequestControllerRef.current?.abort();
      const requestController = new AbortController();
      activeRequestControllerRef.current = requestController;

      setRequestErrorMessage(null);
      if (replaceExistingItems) setIsInitialLoading(true);
      else setIsLoadingMore(true);

      try {
        const responseData = await fetchCategoryPage(category, pageToLoad, {
          signal: requestController.signal,
        });

        const nextItems = Array.isArray(responseData?.results)
          ? responseData.results
          : [];
        const nextPageExists = Boolean(responseData?.info?.next);

        setItems((previousItems) =>
          replaceExistingItems ? nextItems : [...previousItems, ...nextItems],
        );
        setCurrentPage(pageToLoad);
        setHasNextPage(nextPageExists);
      } catch (error) {
        if (requestController.signal.aborted || isAbortError(error)) return;
        setRequestErrorMessage(
          error instanceof Error ? error.message : String(error),
        );
      } finally {
        if (requestController.signal.aborted) {
          // skip state updates
        } else if (replaceExistingItems) {
          setIsInitialLoading(false);
        } else {
          setIsLoadingMore(false);
        }
      }
    },
    [category, isValidCategory],
  );

  const loadNextPage = useCallback(() => {
    if (!hasNextPage) return;
    if (isInitialLoading || isLoadingMore) return;
    void loadPage({ pageToLoad: currentPage + 1, replaceExistingItems: false });
  }, [currentPage, hasNextPage, isInitialLoading, isLoadingMore, loadPage]);

  useEffect(() => {
    if (!isValidCategory) return;

    setItems([]);
    setCurrentPage(1);
    setHasNextPage(false);
    void loadPage({ pageToLoad: 1, replaceExistingItems: true });

    return () => activeRequestControllerRef.current?.abort();
  }, [isValidCategory, category, loadPage]);

  return {
    items,
    currentPage,
    hasNextPage,
    isInitialLoading,
    isLoadingMore,
    requestErrorMessage,
    loadPage,
    loadNextPage,
  };
}
