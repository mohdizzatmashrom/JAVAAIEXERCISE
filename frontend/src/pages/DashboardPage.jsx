import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import ApiInfoCard from '../components/ApiInfoCard.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchApiDocs, fetchApiInfo } from '../services/api.js';

export default function DashboardPage() {
  const { user } = useAuth();
  const [apiInfo, setApiInfo] = useState(null);
  const [apiDocs, setApiDocs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadApiInformation() {
      try {
        setLoading(true);
        setError('');
        const [info, docs] = await Promise.all([fetchApiInfo(), fetchApiDocs()]);

        if (!ignore) {
          setApiInfo(info);
          setApiDocs(docs);
        }
      } catch (err) {
        if (!ignore) {
          setError('Could not connect to the backend. Start Spring Boot on port 8080.');
          console.error(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadApiInformation();

    return () => {
      ignore = true;
    };
  }, []);

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
          <Link className="button-link" to="/app/assets">View Assets</Link>
          <Link className="button-link secondary" to="/app/reports">View Reports</Link>
        </div>
      </section>

      {loading && <LoadingMessage message="Checking backend status..." />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <ApiInfoCard loading={false} error="" apiInfo={apiInfo} apiDocs={apiDocs} />}
    </>
  );
}
