import { Alert, Button, Stack } from '@mui/material';

export const DefaultErrorFallback = ({ error, onReset }) => {
  return (
    <Alert
      severity="error"
      action={
        <Button type="button" color="inherit" size="small" onClick={onReset}>
          Try again
        </Button>
      }
    >
      <Stack spacing={0.5}>
        <div>Something went wrong</div>
        <div>{error?.message ?? 'Unknown error'}</div>
      </Stack>
    </Alert>
  );
};
