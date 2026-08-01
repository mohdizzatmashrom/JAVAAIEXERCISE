import { Navigate, Route, Routes } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AppShell from './components/AppShell.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AssetsPage from './pages/AssetsPage.jsx';
import AssetFormPage from './pages/AssetFormPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import DocsPage from './pages/DocsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/docs" element={<DocsPage />} />

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
        <Route path="assets" element={<AssetsPage />} />
        <Route path="assets/new" element={<AssetFormPage />} />
        <Route path="assets/:assetId/edit" element={<AssetFormPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
