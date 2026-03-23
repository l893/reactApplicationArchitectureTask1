import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <p>
        <Link to="/">← Back to Home</Link>
      </p>
    </>
  );
};
