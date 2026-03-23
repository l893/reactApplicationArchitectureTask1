import { AUTH_KEY } from '@shared/config';

export function isAuthenticated() {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function login() {
  localStorage.setItem(AUTH_KEY, 'true');
}

export function logout() {
  localStorage.setItem(AUTH_KEY, 'false');
}
