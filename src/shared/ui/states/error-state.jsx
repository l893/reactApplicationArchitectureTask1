import { Alert, Button } from '@mui/material';

export const ErrorState = ({
  message,
  onRetry,
  retryLabel = 'Retry',
  isRetryDisabled = false,
}) => {
  return (
    <Alert
      severity="error"
      action={
        onRetry ? (
          <Button
            type="button"
            color="inherit"
            size="small"
            onClick={onRetry}
            disabled={isRetryDisabled}
          >
            {retryLabel}
          </Button>
        ) : null
      }
    >
      {message}
    </Alert>
  );
};
