const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const SESSION_KEY = 'ps_auth_token';
const SESSION_USER_KEY = 'ps_auth_user';

export async function login(username, password) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.detail || 'Credenciales incorrectas');
  }

  const data = await response.json();
  sessionStorage.setItem(SESSION_KEY, data.access_token);
  sessionStorage.setItem(SESSION_USER_KEY, username);
  return data;
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_USER_KEY);
}

export function getToken() {
  return sessionStorage.getItem(SESSION_KEY);
}

export function getUser() {
  return sessionStorage.getItem(SESSION_USER_KEY);
}

export function isAuthenticated() {
  return Boolean(getToken());
}
