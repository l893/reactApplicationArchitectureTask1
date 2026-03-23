import { Outlet, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Container } from '@mui/material';
import { Navbar } from '@widgets';
import { ErrorBoundary } from './error-boundary';
import { LazyBoundary } from '@shared/lib';

export const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Box component="main">
          <ErrorBoundary resetKeys={[location.pathname, location.search]}>
            <LazyBoundary
              fallback={
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                  <CircularProgress />
                </Box>
              }
            >
              <Outlet />
            </LazyBoundary>
          </ErrorBoundary>
        </Box>
      </Container>
    </>
  );
};
