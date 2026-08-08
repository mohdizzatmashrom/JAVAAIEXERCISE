import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import ProtectedRoute from './ProtectedRoute.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';
import { storeAdminAuth } from '../test/testUtils.jsx';

function renderProtectedRoute(initialPath = '/app/assets') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<h1>Login Page</h1>} />
          <Route
            path="/app/assets"
            element={
              <ProtectedRoute>
                <h1>Protected Assets</h1>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('ProtectedRoute', () => {
  it('redirects unauthenticated users to login', () => {
    renderProtectedRoute();

    expect(screen.getByRole('heading', { name: 'Login Page' })).toBeInTheDocument();
  });

  it('shows protected content when auth exists', () => {
    storeAdminAuth();
    renderProtectedRoute();

    expect(screen.getByRole('heading', { name: 'Protected Assets' })).toBeInTheDocument();
  });
});
