import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  isAuthenticated as readIsAuthenticatedFromStorage,
  login as writeLoginToStorage,
  logout as writeLogoutToStorage,
} from './storage';
import { AUTH_KEY } from '@shared/config';
import { AuthActionsContext, AuthStateContext } from './auth-context';

function storageValueToBoolean(storageValue) {
  return storageValue === 'true';
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    readIsAuthenticatedFromStorage(),
  );

  const login = useCallback(() => {
    writeLoginToStorage();
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    writeLogoutToStorage();
    setIsAuthenticated(false);
  }, []);

  const actionsValue = useMemo(() => {
    return { login, logout };
  }, [login, logout]);

  useEffect(() => {
    function handleStorageChange(storageEvent) {
      if (storageEvent.key !== AUTH_KEY) return;
      setIsAuthenticated(storageValueToBoolean(storageEvent.newValue));
    }

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthStateContext value={isAuthenticated}>
      <AuthActionsContext value={actionsValue}>{children}</AuthActionsContext>
    </AuthStateContext>
  );
}
