import { Link } from 'react-router';
import ApiInfoCard from '../components/ApiInfoCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import sampleTickets from '../data/sampleTickets.js';

export default function DashboardPage() {
  const { user } = useAuth();

  const statusCounts = sampleTickets.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  const priorityCounts = sampleTickets.reduce((acc, t) => {
    acc[t.priority] = (acc[t.priority] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <section className="card welcome-card">
        <div>
          <p className="eyebrow">Protected dashboard</p>
          <h2>Welcome, {user?.name}</h2>
          <p>
            You are viewing a protected React route. Refresh the page and the session is
            restored from localStorage.
          </p>
        </div>
        <div className="action-row">
          <Link className="button-link" to="/app/tickets">View Tickets</Link>
          <Link className="button-link secondary" to="/app/reports">View Reports</Link>
        </div>
      </section>

      <ApiInfoCard />

      <section className="summary-cards">
        <div className="summary-card">
          <h3>Total Tickets</h3>
          <span className="summary-number">{sampleTickets.length}</span>
        </div>
        <div className="summary-card">
          <h3>Open</h3>
          <span className="summary-number">{statusCounts.OPEN || 0}</span>
        </div>
        <div className="summary-card">
          <h3>In Progress</h3>
          <span className="summary-number">{statusCounts.IN_PROGRESS || 0}</span>
        </div>
        <div className="summary-card">
          <h3>High Priority</h3>
          <span className="summary-number">{priorityCounts.HIGH || 0}</span>
        </div>
      </section>
    </>
  );
}
