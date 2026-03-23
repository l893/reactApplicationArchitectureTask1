export const DefaultFallback = ({
  componentName,
  filePath,
  availableExports,
}) => (
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
    <h3>⚠️ Ошибка загрузки компонента</h3>
    <p>
      Компонент <strong>{componentName}</strong> не найден в модуле:
    </p>
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

    {Array.isArray(availableExports) && availableExports.length > 0 ? (
      <details style={{ marginTop: '12px' }}>
        <summary>Технические детали</summary>
        <pre
          style={{
            background: '#f8f9fa',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '14px',
            overflow: 'auto',
          }}
        >
          Доступные экспорты: {availableExports.join(', ')}
        </pre>
      </details>
    ) : null}
  </div>
);
