export const Input = ({
  label,
  description,
  error,
  icon,
  withAsterisk = false,
  variant = 'default',
  radius = '4px',
  size = '1rem',
  disabled = false,
  placeholder,
  name,
  type = 'text',
  value,
  onChange,
  className,
  style,
  ...rest
}) => {
  const borderStyle = variant === 'default' ? '1px solid #ccc' : 'none';
  const borderRadius = typeof radius === 'number' ? `${radius}px` : radius;

  return (
    <>
      <div className={className} style={{ marginBottom: '1rem', ...style }}>
        {label && (
          <label
            style={{
              display: 'block',
              marginBottom: '0.3rem',
            }}
          >
            {label} {withAsterisk && <span style={{ color: 'red' }}>*</span>}
          </label>
        )}
        {description && (
          <div
            style={{
              marginBottom: '0.3rem',
              fontSize: '0.8rem',
              color: '#666',
            }}
          >
            {description}
          </div>
        )}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: borderStyle,
            borderRadius,
            padding: '0.5rem',
            backgroundColor: disabled ? '#f9f9f9' : '#fff',
          }}
        >
          {icon && <div style={{ marginRight: '0.5rem' }}>{icon}</div>}
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            style={{
              border: 'none',
              outline: 'none',
              fontSize: size,
              flex: 1,
              backgroundColor: 'transparent',
            }}
            {...rest}
          />
        </div>
        {error && (
          <div
            style={{ marginTop: '0.3rem', fontSize: '0.8rem', color: 'red' }}
          >
            {error}
          </div>
        )}
      </div>
    </>
  );
};
