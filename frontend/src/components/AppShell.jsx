import { NavLink, Outlet, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

export default function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Day 13 Forms & Validation</p>
          <h1>Asset Tracker UI</h1>
          <p className="header-subtitle">
            Controlled forms, client-side validation, inline errors and backend submit flows.
          </p>
        </div>
        <div className="user-panel">
          <span>{user?.name}</span>
          <strong>{user?.role}</strong>
          <button type="button" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <nav className="app-nav" aria-label="Main navigation">
        <NavLink to="/app/dashboard">Dashboard</NavLink>
        <NavLink to="/app/assets" end>Assets</NavLink>
        <NavLink to="/app/assets/new">Asset Form</NavLink>
        <NavLink to="/app/reports">Reports</NavLink>
        <NavLink to="/docs">API Docs</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
