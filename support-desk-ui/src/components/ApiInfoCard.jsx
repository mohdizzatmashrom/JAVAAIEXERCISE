import { useState, useEffect } from 'react';
import { fetchApiInfo } from '../services/api.js';

export default function ApiInfoCard() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchApiInfo();
        if (!cancelled) {
          setInfo(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="api-info-card">
        <p className="api-info-loading">Loading API info...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="api-info-card api-info-error">
        <p className="api-info-error-text">Could not connect to backend: {error}</p>
        <p className="api-info-error-hint">Make sure the Spring Boot backend is running on port 8080.</p>
      </div>
    );
  }

  return (
    <div className="api-info-card api-info-success">
      <h3 className="api-info-title">Backend API Info</h3>
      <dl className="api-info-fields">
        {Object.entries(info).map(([key, value]) => (
          <div className="api-info-row" key={key}>
            <dt>{key}</dt>
            <dd>{String(value)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
