import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <main className="public-page">
      <section className="card not-found-card">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The route does not exist in the Day 12 React Router configuration.</p>
        <Link to="/app/dashboard" className="button-link">Go to Dashboard</Link>
      </section>
    </main>
  );
}
