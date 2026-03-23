import { Link, useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { AppBar, Button, Stack, Toolbar } from '@mui/material';
import { useAuthActions, useAuthState } from '@features/auth';

function NavButton({ to, end, children }) {
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: Boolean(end) });

  return (
    <Button
      component={Link}
      to={to}
      variant={match ? 'contained' : 'text'}
      color={match ? 'primary' : 'inherit'}
    >
      {children}
    </Button>
  );
}

export const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthState();
  const authActions = useAuthActions();

  const handleLogout = () => {
    authActions.logout();
    navigate('/login', { replace: true });
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ px: 0, gap: 1, flexWrap: 'wrap' }}>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
          <NavButton to="/" end>
            Home
          </NavButton>
          <NavButton to="/characters">Characters</NavButton>
          <NavButton to="/locations">Locations</NavButton>
          <NavButton to="/episodes">Episodes</NavButton>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ marginLeft: 'auto' }}>
          {!isAuthenticated ? (
            <Button component={Link} to="/login" variant="outlined">
              Login
            </Button>
          ) : (
            <Button type="button" onClick={handleLogout} variant="outlined">
              Logout
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
