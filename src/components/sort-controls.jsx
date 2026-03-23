import { Button, Stack, Tooltip } from '@mui/material';

export const SortControls = ({ sort, onChange }) => {
  const isAsc = sort === 'asc';
  const isDesc = sort === 'desc';

  return (
    <>
      <Stack direction="row" spacing={1.5} sx={{ mb: 2, flexWrap: 'wrap' }}>
        <Button
          type="button"
          onClick={() => onChange('asc')}
          aria-pressed={isAsc}
          disabled={isAsc}
          variant={isAsc ? 'contained' : 'outlined'}
        >
          Sort ASC
        </Button>

        <Button
          type="button"
          onClick={() => onChange('desc')}
          aria-pressed={isDesc}
          disabled={isDesc}
          variant={isDesc ? 'contained' : 'outlined'}
        >
          Sort DESC
        </Button>

        <Tooltip title="Удаляет параметр sort из URL">
          <span>
            <Button
              type="button"
              onClick={() => onChange(null)}
              disabled={!sort}
              variant="text"
            >
              Clear sort
            </Button>
          </span>
        </Tooltip>
      </Stack>
    </>
  );
};
