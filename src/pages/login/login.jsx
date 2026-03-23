import { useMemo } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuthActions, useAuthState } from '@features/auth';
import { Signin, Wrapper } from '@components/auth';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAuthState();
  const authActions = useAuthActions();

  const redirectTo = useMemo(() => {
    const from = location.state?.from;
    return from ? `${from.pathname}${from.search || ''}` : '/';
  }, [location.state]);

  const handleSignin = (formData) => {
    // formData = { email, password }
    void formData;
    authActions.login();
    navigate(redirectTo, { replace: true });
  };

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <>
      <div>
        <Wrapper>
          <h1>Login</h1>
          <Signin onSubmit={handleSignin} />
        </Wrapper>
      </div>
    </>
  );
};
