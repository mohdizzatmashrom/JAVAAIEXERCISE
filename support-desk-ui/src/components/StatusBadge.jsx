const statusStyles = {
  OPEN: { background: '#dbeafe', color: '#2563eb', border: '1px solid #93c5fd' },
  IN_PROGRESS: { background: '#fef3c7', color: '#d97706', border: '1px solid #fcd34d' },
  RESOLVED: { background: '#dcfce7', color: '#16a34a', border: '1px solid #86efac' },
  CLOSED: { background: '#f3f4f6', color: '#6b7280', border: '1px solid #d1d5db' }
};

const statusLabels = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed'
};

export default function StatusBadge({ status }) {
  const style = statusStyles[status] || statusStyles.OPEN;
  const label = statusLabels[status] || status;

  return (
    <span className="badge" style={style}>
      {label}
    </span>
  );
}
