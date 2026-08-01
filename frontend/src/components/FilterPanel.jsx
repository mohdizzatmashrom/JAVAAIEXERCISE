export default function FilterPanel({ searchText, statusFilter, onSearchChange, onStatusChange }) {
  return (
    <section className="filter-panel" aria-label="Asset filters">
      <label>
        Search assets
        <input
          type="search"
          placeholder="Search by tag, name, category or location"
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <label>
        Status
        <select value={statusFilter} onChange={(event) => onStatusChange(event.target.value)}>
          <option value="ALL">All</option>
          <option value="AVAILABLE">Available</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="MAINTENANCE">Maintenance</option>
        </select>
      </label>
    </section>
  );
}
