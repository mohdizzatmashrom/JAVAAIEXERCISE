import { Link } from 'react-router';
import PriorityBadge from './PriorityBadge.jsx';
import StatusBadge from './StatusBadge.jsx';
import { useTicketData } from '../context/TicketDataContext.jsx';

const QUICK_STATUSES = ['OPEN', 'IN_PROGRESS', 'CLOSED'];

export default function TicketDetail({ ticket }) {
  const { updateTicketStatus } = useTicketData();

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
          <dd>{String(ticket.createdAt ?? '').replace('T', ' ').slice(0, 16)}</dd>
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

      <div className="status-quick-update">
        <span className="status-quick-label">Quick status:</span>
        <div className="status-btn-group">
          {QUICK_STATUSES.map((status) => (
            <button
              key={status}
              className={`status-btn ${ticket.status === status ? 'status-btn-active' : ''}`}
              onClick={() => updateTicketStatus(ticket.id, status)}
              disabled={ticket.status === status}
            >
              {status === 'IN_PROGRESS' ? 'In Progress' : status.charAt(0) + status.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <Link to={`/app/tickets/${ticket.id}/edit`} className="button-link secondary">
          Edit Ticket
        </Link>
      </div>
    </div>
  );
}
