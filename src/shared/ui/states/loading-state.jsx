import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingState = ({ message = 'Loading…' }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <CircularProgress />
        {message ? (
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
};
