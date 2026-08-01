const priorityStyles = {
  HIGH: { background: '#fee2e2', color: '#dc2626', border: '1px solid #fca5a5' },
  MEDIUM: { background: '#fef3c7', color: '#d97706', border: '1px solid #fcd34d' },
  LOW: { background: '#dcfce7', color: '#16a34a', border: '1px solid #86efac' }
};

export default function PriorityBadge({ priority }) {
  const style = priorityStyles[priority] || priorityStyles.LOW;

  return (
    <span className="badge" style={style}>
      {priority}
    </span>
  );
}
