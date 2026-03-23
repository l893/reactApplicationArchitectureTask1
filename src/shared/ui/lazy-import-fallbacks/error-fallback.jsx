export const ErrorFallback = ({ filePath, errorMessage }) => (
  <div
    style={{
      padding: '20px',
      margin: '10px',
      border: '2px solid #ff6b6b',
      borderRadius: '8px',
      backgroundColor: '#fff5f5',
      color: '#c92a2a',
      fontFamily: 'system-ui, sans-serif',
    }}
  >
    <h3>⚠️ Ошибка загрузки модуля</h3>
    <p>Не удалось загрузить модуль:</p>
    <code
      style={{
        background: '#f1f3f5',
        padding: '4px 8px',
        borderRadius: '4px',
        display: 'inline-block',
      }}
    >
      {filePath}
    </code>

    <p style={{ marginTop: '8px' }}>Ошибка: {errorMessage}</p>
  </div>
);
