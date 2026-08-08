import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

export const sampleAssets = [
  {
    id: 'A001',
    assetTag: 'LAP-2026-001',
    name: 'Dell Latitude 5440',
    category: 'Laptop',
    serialNumber: 'SN-LAP-001',
    status: 'AVAILABLE',
    location: 'HQ Level 3',
    assignedTo: null
  },
  {
    id: 'A002',
    assetTag: 'MON-2026-001',
    name: 'Samsung Monitor',
    category: 'Monitor',
    serialNumber: 'SN-MON-001',
    status: 'ASSIGNED',
    location: 'HQ Level 2',
    assignedTo: 'admin@example.com'
  },
  {
    id: 'A003',
    assetTag: 'TAB-2026-001',
    name: 'iPad Air',
    category: 'Tablet',
    serialNumber: 'SN-TAB-001',
    status: 'MAINTENANCE',
    location: 'Service Desk',
    assignedTo: null
  }
];

export function renderWithRouter(ui, options = {}) {
  const { route = '/', ...renderOptions } = options;

  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>,
    renderOptions
  );
}

export function storeAdminAuth() {
  localStorage.setItem('assetTrackerAuth', JSON.stringify({
    token: 'test-admin-token',
    tokenType: 'Bearer',
    expiresInMinutes: 60,
    user: {
      id: 'U001',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'ADMIN'
    }
  }));
}

export function createJsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}
