import StatusBadge from './StatusBadge.jsx';
import EmptyState from './EmptyState.jsx';

export default function AssetDetail({ asset }) {
  if (!asset) {
    return <EmptyState message="Select an asset to view more information." />;
  }

  return (
    <section className="card detail-card">
      <div className="section-heading row-heading">
        <div>
          <h2>{asset.name}</h2>
          <p>{asset.assetTag}</p>
        </div>
        <StatusBadge status={asset.status} />
      </div>

      <dl className="detail-list">
        <div>
          <dt>Category</dt>
          <dd>{asset.category}</dd>
        </div>
        <div>
          <dt>Serial Number</dt>
          <dd>{asset.serialNumber}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{asset.location}</dd>
        </div>
        <div>
          <dt>Assigned To</dt>
          <dd>{asset.assignedTo || 'Not assigned'}</dd>
        </div>
      </dl>
    </section>
  );
}
