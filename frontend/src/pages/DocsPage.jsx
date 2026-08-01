import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import { fetchApiDocs } from '../services/api.js';

export default function DocsPage() {
  const [docs, setDocs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadDocs() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchApiDocs();

        if (!ignore) {
          setDocs(data);
        }
      } catch (err) {
        if (!ignore) {
          setError('Could not load API documentation from the backed.');
          console.error(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadDocs();

    return () => { ignore = true; };
  }, []);

  return (
    <main className="public-page">
      <section className="card docs-card">
        <p className="eyebrow">API Documentation (Public Route)</p>
        <h1>API Documentation</h1>
        <p>This page is public. It does not require login.</p>
        <Link to="/app/dashboard" className="button-link">Back to App</Link>
      </section>

      {loading && <LoadingMessage message="Loading API documentation..." />}
      {error && <ErrorMessage message={error} />}

      {docs && (
        <section className="card endpoint-card">
          <h2>{docs.name} {docs.version}</h2>
          <p>Base path: <strong>{docs.basePath}</strong></p>
          <div className="endpoint-list">
            {docs.endpoints.map((endpoint) => (
              <div className="endpoint-row" key={`${endpoint.method}-${endpoint.path}`}>
                <strong>{endpoint.method}</strong>
                <code>{endpoint.path}</code>
                <span>{endpoint.access}</span>
                <p>{endpoint.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
