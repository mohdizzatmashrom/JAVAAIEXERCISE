export default function TicketFilterPanel({ searchText, onSearchChange, statusFilter, onStatusChange, priorityFilter, onPriorityChange }) {
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
        <option value="RESOLVED">Resolved</option>
        <option value="CLOSED">Closed</option>
      </select>

      <select
        className="filter-select"
        value={priorityFilter}
        onChange={(e) => onPriorityChange(e.target.value)}
      >
        <option value="">All Priorities</option>
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
      </select>
    </div>
  );
}
