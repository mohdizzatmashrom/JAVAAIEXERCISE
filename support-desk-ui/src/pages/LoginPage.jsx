import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Admin@12345');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || '/app/dashboard';

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Check the backend and credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <p className="eyebrow">Day 12</p>
        <h1>Login to Support Desk</h1>
        <p>
          This login calls our Day 9 backend, stores the JWT in localStorage for this demo
          and redirects the user to the protected area of our application.
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error && <p className="login-error">{error}</p>}
          {loading && <p className="login-loading">Logging in...</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Please wait...' : 'Login'}
          </button>
        </form>

        <div className="login-help">
          <strong>Seeded admin</strong>
          <span>email: admin@example.com</span>
          <span>password: Admin@12345</span>
        </div>
      </section>
    </main>
  );
}
