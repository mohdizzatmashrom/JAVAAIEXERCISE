import AppHeader from './AppHeader.jsx';

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <AppHeader />
      <main>{children}</main>
    </div>
  );
}
