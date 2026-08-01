import PriorityBadge from './PriorityBadge.jsx';
import StatusBadge from './StatusBadge.jsx';

export default function TicketList({ tickets, selectedId, onSelect }) {
  return (
    <ul className="ticket-list">
      {tickets.map((ticket) => (
        <li
          key={ticket.id}
          className={`ticket-item ${selectedId === ticket.id ? 'selected' : ''}`}
          onClick={() => onSelect(ticket.id)}
        >
          <div className="ticket-item-header">
            <span className="ticket-id">{ticket.id}</span>
            <PriorityBadge priority={ticket.priority} />
          </div>
          <p className="ticket-title">{ticket.title}</p>
          <div className="ticket-item-footer">
            <StatusBadge status={ticket.status} />
            <span className="ticket-date">{ticket.createdAt}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
