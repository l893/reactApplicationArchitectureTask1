export const formatDate = (value) => {
  if (!value) return '—';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Неверная дата';

  return date.toLocaleString();
};

export const FIELD_MAP = {
  characters: [
    { key: 'status', label: 'Status' },
    { key: 'species', label: 'Species' },
    { key: 'type', label: 'Type' },
    { key: 'gender', label: 'Gender' },
    { key: 'created', label: 'Created', format: formatDate },
  ],
  locations: [
    { key: 'type', label: 'Type' },
    { key: 'dimension', label: 'Dimension' },
    { key: 'created', label: 'Created', format: formatDate },
  ],
  episodes: [
    { key: 'episode', label: 'Code' },
    { key: 'air_date', label: 'Air date' },
    { key: 'created', label: 'Created', format: formatDate },
  ],
};
