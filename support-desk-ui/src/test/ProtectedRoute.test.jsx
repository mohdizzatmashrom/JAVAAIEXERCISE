import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { AuthProvider } from '../context/AuthContext.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

function renderWithRouter({ initialEntries = ['/app/tickets'] } = {}) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<h1>Login Page</h1>} />
          <Route
            path="/app/tickets"
            element={
              <ProtectedRoute>
                <h1>Protected Tickets</h1>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('ProtectedRoute', () => {
  it('redirects unauthenticated users to /login', () => {
    localStorage.clear();
    renderWithRouter();

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Tickets')).not.toBeInTheDocument();
  });

  it('allows authenticated users to view the protected ticket page', () => {
    const fakeAuth = {
      token: 'test-jwt-token',
      tokenType: 'Bearer',
      expiresInMinutes: 30,
      user: { id: '1', name: 'Test User', email: 'test@example.com', role: 'ADMIN' }
    };
    localStorage.setItem('supportDeskAuth', JSON.stringify(fakeAuth));

    renderWithRouter();

    expect(screen.getByText('Protected Tickets')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});
