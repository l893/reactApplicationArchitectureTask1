import { createContext, use } from 'react';

export const AuthStateContext = createContext(undefined);
AuthStateContext.displayName = 'AuthStateContext';

export const AuthActionsContext = createContext(undefined);
AuthActionsContext.displayName = 'AuthActionsContext';

export function useAuthState() {
  const authState = use(AuthStateContext);

  if (authState === undefined) {
    throw new Error('useAuthState must be used within <AuthProvider>.');
  }

  return authState;
}

export function useAuthActions() {
  const authActions = use(AuthActionsContext);

  if (authActions === undefined) {
    throw new Error('useAuthActions must be used within <AuthProvider>.');
  }

  return authActions;
}
