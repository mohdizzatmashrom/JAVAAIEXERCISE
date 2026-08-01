const STATUSES = ['AVAILABLE', 'ASSIGNED', 'MAINTENANCE'];

export default function OptimisticStatusControls({ asset, updatingId, onStatusChange }) {
  if (!asset) {
    return null;
  }

  const isUpdating = updatingId === asset.id;

  return (
    <section className="card">
      <div className="section-heading">
        <p className="eyebrow">Optimistic update</p>
        <h2>Quick status update</h2>
        <p>
          The UI updates immediately, then confirms with the backend. If the backend fails, it rolls back.
        </p>
      </div>
      <div className="action-row">
        {STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            className={status === asset.status ? 'button-link' : 'button-link secondary'}
            disabled={isUpdating || status === asset.status}
            onClick={() => onStatusChange(asset.id, status)}
          >
            {status}
          </button>
        ))}
      </div>
      {isUpdating && <p className="message loading-message">Saving status change...</p>}
    </section>
  );
}
