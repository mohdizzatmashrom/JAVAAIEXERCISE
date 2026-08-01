import { createContext, useContext, useMemo, useState } from 'react';
import { loginRequest } from '../services/api.js';

const STORAGE_KEY = 'assetTrackerAuth';
const AuthContext = createContext(null);

function readStoredAuth() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readStoredAuth);

  async function login(email, password) {
    const response = await loginRequest(email, password);

    const nextAuth = {
      token: response.token,
      tokenType: response.tokenType,
      expiresInMinutes: response.expiresInMinutes,
      user: {
        id: response.userId,
        name: response.name,
        email: response.email,
        role: response.role
      }
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAuth));
    setAuth(nextAuth);
    return nextAuth;
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setAuth(null);
  }

  const value = useMemo(
    () => ({
      auth,
      token: auth?.token ?? '',
      user: auth?.user ?? null,
      isAuthenticated: Boolean(auth?.token),
      login,
      logout
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return value;
}
