import { Alert } from '@mui/material';

export const EmptyState = ({ message = 'No data' }) => {
  return <Alert severity="info">{message}</Alert>;
};
