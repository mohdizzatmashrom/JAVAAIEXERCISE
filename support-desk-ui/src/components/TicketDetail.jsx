import PriorityBadge from './PriorityBadge.jsx';
import StatusBadge from './StatusBadge.jsx';

export default function TicketDetail({ ticket }) {
  if (!ticket) {
    return (
      <div className="ticket-detail empty-detail">
        <p>Select a ticket to view details</p>
      </div>
    );
  }

  return (
    <div className="ticket-detail">
      <div className="detail-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="detail-badges">
          <PriorityBadge priority={ticket.priority} />
          <StatusBadge status={ticket.status} />
        </div>
      </div>

      <h2 className="detail-title">{ticket.title}</h2>

      <dl className="detail-fields">
        <div className="detail-row">
          <dt>Category</dt>
          <dd>{ticket.category}</dd>
        </div>
        <div className="detail-row">
          <dt>Created By</dt>
          <dd>{ticket.createdBy}</dd>
        </div>
        <div className="detail-row">
          <dt>Created At</dt>
          <dd>{ticket.createdAt}</dd>
        </div>
        <div className="detail-row">
          <dt>Priority</dt>
          <dd>{ticket.priority}</dd>
        </div>
        <div className="detail-row">
          <dt>Status</dt>
          <dd>{ticket.status}</dd>
        </div>
      </dl>
    </div>
  );
}
