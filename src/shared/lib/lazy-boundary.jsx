import { Suspense } from 'react';

export const LazyBoundary = ({ children, fallback }) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};
