export default function TicketFilterPanel({
  searchText,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortByChange,
  direction,
  onDirectionChange,
  pageSize,
  onPageSizeChange
}) {
  return (
    <div className="filter-panel">
      <input
        type="text"
        className="filter-input"
        placeholder="Search by title or category..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        className="filter-select"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="OPEN">Open</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="CLOSED">Closed</option>
      </select>

      <select
        className="filter-select"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
      >
        <option value="createdAt">Date Created</option>
        <option value="title">Title</option>
        <option value="priority">Priority</option>
        <option value="status">Status</option>
      </select>

      <select
        className="filter-select"
        value={direction}
        onChange={(e) => onDirectionChange(e.target.value)}
      >
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>

      <select
        className="filter-select"
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
        <option value={20}>20 per page</option>
      </select>
    </div>
  );
}
