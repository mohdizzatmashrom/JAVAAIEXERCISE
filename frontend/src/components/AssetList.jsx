import StatusBadge from './StatusBadge.jsx';
import EmptyState from './EmptyState.jsx';

export default function AssetList({ assets, selectedAssetId, onSelectAsset }) {
  if (assets.length === 0) {
    return <EmptyState message="No assets match the current filter." />;
  }

  return (
    <section className="card list-card">
      <div className="section-heading">
        <h2>Asset List</h2>
        <p>Select an asset to view details.</p>
      </div>

      <div className="asset-list">
        {assets.map((asset) => (
          <button
            key={asset.id}
            className={asset.id === selectedAssetId ? 'asset-row selected' : 'asset-row'}
            onClick={() => onSelectAsset(asset)}
            type="button"
          >
            <div>
              <strong>{asset.assetTag}</strong>
              <span>{asset.name}</span>
            </div>
            <StatusBadge status={asset.status} />
          </button>
        ))}
      </div>
    </section>
  );
}
