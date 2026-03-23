import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, Navigate, Link, useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  fetchItemById,
  ALLOWED_CATEGORIES,
  FIELD_MAP,
} from '@entities/rick-morty';
import { isAbortError } from '@shared/api';
import { ErrorState, LoadingState } from '@shared/ui';

export const DetailPage = () => {
  const { category, id } = useParams();
  const location = useLocation();

  const activeRequestControllerRef = useRef(null);

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requestErrorMessage, setRequestErrorMessage] = useState(null);

  const isValidCategory = ALLOWED_CATEGORIES.includes(category);

  const loadItem = useCallback(async () => {
    if (!isValidCategory) return;

    activeRequestControllerRef.current?.abort();
    const requestController = new AbortController();
    activeRequestControllerRef.current = requestController;

    setIsLoading(true);
    setRequestErrorMessage(null);

    try {
      const loadedItem = await fetchItemById(category, id, {
        signal: requestController.signal,
      });
      setItem(loadedItem);
    } catch (error) {
      if (requestController.signal.aborted || isAbortError(error)) return;
      setRequestErrorMessage(
        error instanceof Error ? error.message : String(error),
      );
      setItem(null);
    } finally {
      if (!requestController.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [category, id, isValidCategory]);

  useEffect(() => {
    void loadItem();
    return () => activeRequestControllerRef.current?.abort();
  }, [loadItem]);

  if (!isValidCategory) return <Navigate to="/404" replace />;

  if (isLoading) {
    return <LoadingState message="Loading..." />;
  }

  if (requestErrorMessage) {
    return (
      <ErrorState
        message={`Failed to load item: ${requestErrorMessage}`}
        onRetry={loadItem}
      />
    );
  }

  if (!item) return <Navigate to="/404" replace />;

  const fields = FIELD_MAP[category] ?? [];

  return (
    <>
      <Button component={Link} to={`..${location.search}`} relative="path">
        ← Back to list
      </Button>

      <Paper variant="outlined" sx={{ mt: 2, p: 2, maxWidth: 720 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          {category === 'characters' && item.image ? (
            <img
              src={item.image}
              alt={item.name}
              width={96}
              height={96}
              style={{ borderRadius: 12, objectFit: 'cover' }}
              loading="lazy"
            />
          ) : null}

          <Box>
            <Typography variant="h5" component="h2" sx={{ m: 0 }}>
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Category: <strong>{category}</strong> · ID:{' '}
              <strong>{item.id}</strong>
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Box
          component="dl"
          sx={{
            m: 0,
            display: 'grid',
            gridTemplateColumns: '160px 1fr',
            rowGap: 1.25,
            columnGap: 1.5,
          }}
        >
          {fields.map(({ key, label, format }) => {
            const raw = item[key];
            const value =
              raw === undefined || raw === null || raw === ''
                ? '—'
                : format
                  ? format(raw)
                  : String(raw);

            return (
              <div key={key} style={{ display: 'contents' }}>
                <dt style={{ color: '#6b7280' }}>{label}</dt>
                <dd style={{ margin: 0 }}>{value}</dd>
              </div>
            );
          })}
        </Box>
      </Paper>
    </>
  );
};
