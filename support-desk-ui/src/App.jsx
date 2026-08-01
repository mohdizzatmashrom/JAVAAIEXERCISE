import { Navigate, Route, Routes } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AppShell from './components/AppShell.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import TicketsPage from './pages/TicketsPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="tickets" element={<TicketsPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
    </Routes>
  );
}
