import { Box, CircularProgress, Typography } from '@mui/material';

export const DetailFallback = () => (
  <Box sx={{ textAlign: 'center', py: 6 }}>
    <CircularProgress />
    <Typography variant="h6" sx={{ mt: 2 }}>
      Детальная страница загружается...
    </Typography>
  </Box>
);
