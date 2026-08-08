import { countByStatus } from '../utils/tickets.js';

export default function TicketSummaryCards({ tickets }) {
  const total = tickets.length;
  const open = countByStatus(tickets, 'OPEN');
  const inProgress = countByStatus(tickets, 'IN_PROGRESS');
  const closed = countByStatus(tickets, 'CLOSED');

  return (
    <section className="summary-grid" aria-label="Ticket summary">
      <TicketSummaryCard label="Total Tickets" value={total} />
      <TicketSummaryCard label="Open" value={open} />
      <TicketSummaryCard label="In Progress" value={inProgress} />
      <TicketSummaryCard label="Closed" value={closed} />
    </section>
  );
}

function TicketSummaryCard({ label, value }) {
  return (
    <article className="summary-card">
      <p>{label}</p>
      <strong>{value}</strong>
    </article>
  );
}
