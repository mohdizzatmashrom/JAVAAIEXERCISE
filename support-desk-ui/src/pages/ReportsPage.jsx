import { useEffect, useMemo, useState } from 'react';
import StatusBadge from '../components/StatusBadge.jsx';
import PriorityBadge from '../components/PriorityBadge.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchTickets } from '../services/api.js';

const STATUS_ORDER = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
const PRIORITY_ORDER = ['HIGH', 'MEDIUM', 'LOW'];

function countBy(items, key) {
  return items.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] || 0) + 1;
    return acc;
  }, {});
}

export default function ReportsPage() {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    fetchTickets(token)
      .then((data) => {
        if (!ignore) setTickets(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => { ignore = true; };
  }, [token]);

  const statusCounts = useMemo(() => countBy(tickets, 'status'), [tickets]);
  const priorityCounts = useMemo(() => countBy(tickets, 'priority'), [tickets]);
  const categoryCounts = useMemo(() => countBy(tickets, 'category'), [tickets]);

  return (
    <>
      <h2 className="page-title">Reports</h2>

      {loading && <p>Loading reports...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (<>

      <section className="card report-card">
        <h3>Tickets by Status</h3>
        <ul className="report-list">
          {STATUS_ORDER.map((status) => (
            <li key={status} className="report-row">
              <StatusBadge status={status} />
              <span className="report-count">{statusCounts[status] || 0}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="card report-card">
        <h3>Tickets by Priority</h3>
        <ul className="report-list">
          {PRIORITY_ORDER.map((priority) => (
            <li key={priority} className="report-row">
              <PriorityBadge priority={priority} />
              <span className="report-count">{priorityCounts[priority] || 0}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="card report-card">
        <h3>Tickets by Category</h3>
        <ul className="report-list">
          {Object.entries(categoryCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([category, count]) => (
              <li key={category} className="report-row">
                <span className="report-label">{category}</span>
                <span className="report-count">{count}</span>
              </li>
            ))}
        </ul>
      </section>
      </>
      )}
    </>
  );
}
