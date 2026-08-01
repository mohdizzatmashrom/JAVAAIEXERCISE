import { useEffect, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import ReportCard from '../components/ReportCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchAssetReports } from '../services/api.js';

export default function ReportsPage() {
  const { token } = useAuth();
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadReports() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchAssetReports(token);

        if (!ignore) {
          setReports(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Could not load protected reports.');
          console.error(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadReports();

    return () => {
      ignore = true;
    };
  }, [token]);

  if (loading) {
    return <LoadingMessage message="Loading protected reports..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <section className="report-grid">
      <ReportCard title="Assets by Status" items={reports.byStatus} />
      <ReportCard title="Assets by Category" items={reports.byCategory} />
      <ReportCard title="Assets by Location" items={reports.byLocation} />
    </section>
  );
}
