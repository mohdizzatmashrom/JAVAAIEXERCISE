import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import AssetDetail from '../components/AssetDetail.jsx';
import AssetList from '../components/AssetList.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import FilterPanel from '../components/FilterPanel.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import SummaryCards from '../components/SummaryCards.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchAssets } from '../services/api.js';
import { filterAssets } from '../utils/assets.js';

export default function AssetsPage() {
  const { token, user } = useAuth();
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const filteredAssets = useMemo(
    () => filterAssets(assets, searchText, statusFilter),
    [assets, searchText, statusFilter]
  );

  useEffect(() => {
    let ignore = false;

    async function loadAssets() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchAssets(token);

        if (!ignore) {
          setAssets(data);
          setSelectedAsset(data[0] ?? null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Could not load protected asset data.');
          console.error(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadAssets();

    return () => {
      ignore = true;
    };
  }, [token]);

  useEffect(() => {
    if (filteredAssets.length === 0) {
      setSelectedAsset(null);
      return;
    }

    const selectedStillVisible = filteredAssets.some((asset) => asset.id === selectedAsset?.id);

    if (!selectedStillVisible) {
      setSelectedAsset(filteredAssets[0]);
    }
  }, [filteredAssets, selectedAsset]);

  if (loading) {
    return <LoadingMessage message="Loading protected assets..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <section className="card welcome-card">
        <div>
          <p className="eyebrow">Protected asset data</p>
          <h2>Assets</h2>
          <p>View backend data, then use the Day 13 form wizard to create or update records.</p>
        </div>
        {user?.role === 'ADMIN' && (
          <div className="action-row">
            <Link className="button-link" to="/app/assets/new">Create Asset</Link>
            {selectedAsset && (
              <Link className="button-link secondary" to={`/app/assets/${selectedAsset.id}/edit`}>
                Edit Selected
              </Link>
            )}
          </div>
        )}
      </section>

      <SummaryCards assets={assets} />
      <FilterPanel
        searchText={searchText}
        statusFilter={statusFilter}
        onSearchChange={setSearchText}
        onStatusChange={setStatusFilter}
      />
      <section className="workspace-grid">
        <AssetList
          assets={filteredAssets}
          selectedAssetId={selectedAsset?.id}
          onSelectAsset={setSelectedAsset}
        />
        <AssetDetail asset={selectedAsset} />
      </section>
    </>
  );
}
