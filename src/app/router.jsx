import { createBrowserRouter } from 'react-router-dom';
import { lazyImport } from '@shared/lib';
import { Layout } from './layout';
import { RequireAuth } from '@features/auth';
import { CategoryFallback, DetailFallback } from './fallbacks';

const Login = lazyImport(
  () => import('@pages/login/login'),
  'Login',
  '@pages/login/login',
);

const Home = lazyImport(
  () => import('@pages/home/home'),
  'Home',
  '@pages/home/home',
);

const CategoryPage = lazyImport(
  () => import('@pages/category/category-page'),
  'CategoryPage',
  '@pages/category/category-page',
  CategoryFallback,
);

const DetailPage = lazyImport(
  () => import('@pages/detail/detail-page'),
  'DetailPage',
  '@pages/detail/detail-page',
  DetailFallback,
);

const NotFound = lazyImport(
  () => import('@pages/not-found/not-found'),
  'NotFound',
  '@pages/not-found/not-found',
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      {
        element: <RequireAuth />,
        children: [
          {
            path: ':category',
            children: [
              { index: true, element: <CategoryPage /> },
              { path: ':id', element: <DetailPage /> },
            ],
          },
        ],
      },

      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
