import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import AssetsPage from './AssetsPage.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';
import { AssetDataProvider } from '../context/AssetDataContext.jsx';
import { createJsonResponse, sampleAssets, storeAdminAuth } from '../test/testUtils.jsx';

function renderAssetsPage() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <AssetDataProvider>
          <AssetsPage />
        </AssetDataProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

describe('AssetsPage', () => {
  it('loads and displays paged assets from the backend', async () => {
    storeAdminAuth();

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(createJsonResponse({
      content: sampleAssets,
      number: 0,
      size: 5,
      totalPages: 1,
      totalElements: sampleAssets.length
    }));

    renderAssetsPage();

    expect(
      await screen.findByRole('button', { name: /LAP-2026-001/i })
    ).toBeInTheDocument();

    expect(screen.getByText('Samsung Monitor')).toBeInTheDocument();
    expect(globalThis.fetch).toHaveBeenCalledWith(
      '/api/v1/assets/paged?page=0&size=5&sortBy=assetTag&direction=asc',
      expect.objectContaining({ method: 'GET' })
    );
  });
});
