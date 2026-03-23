import { useEffect, useRef } from 'react';

export function useInfiniteScroll({
  isEnabled,
  onLoadMore,
  rootMargin = '400px',
}) {
  const sentinelElementRef = useRef(null);
  const latestOnLoadMoreRef = useRef(onLoadMore);

  useEffect(() => {
    latestOnLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  useEffect(() => {
    if (!isEnabled) return;

    const sentinelElement = sentinelElementRef.current;
    if (!sentinelElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry?.isIntersecting) {
          latestOnLoadMoreRef.current?.();
        }
      },
      { rootMargin },
    );

    observer.observe(sentinelElement);
    return () => observer.disconnect();
  }, [isEnabled, rootMargin]);

  return sentinelElementRef;
}
