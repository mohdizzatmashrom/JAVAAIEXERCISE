export default function DataControls({
  pageInfo,
  cacheMessage,
  loading,
  onRefresh,
  onPageSizeChange,
  onSortChange
}) {
  return (
    <section className="card">
      <div className="section-heading">
        <p className="eyebrow">Data layer</p>
        <h2>Server pagination and cache controls</h2>
        <p>{cacheMessage}</p>
      </div>

      <div className="action-row">
        <label>
          Page size
          <select
            value={pageInfo.size}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </label>

        <label>
          Sort by
          <select
            value={pageInfo.sortBy}
            onChange={(event) => onSortChange(event.target.value, pageInfo.direction)}
          >
            <option value="assetTag">Asset Tag</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="status">Status</option>
            <option value="location">Location</option>
          </select>
        </label>

        <label>
          Direction
          <select
            value={pageInfo.direction}
            onChange={(event) => onSortChange(pageInfo.sortBy, event.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      <div className="action-row form-actions">
        <button className="button-link" type="button" onClick={onRefresh} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh from backend'}
        </button>
      </div>
    </section>
  );
}
