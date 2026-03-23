export const Wrapper = ({ children }) => {
  return (
    <>
      <div
        style={{
          margin: '1rem',
          padding: '0.5rem',
          borderRadius: '0.5rem',
          border: '1px solid rgb(164,166,164)',
        }}
      >
        {children}
      </div>
    </>
  );
};
