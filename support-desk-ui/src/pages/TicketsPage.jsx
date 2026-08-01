import { useState, useMemo, useEffect } from 'react';
import TicketFilterPanel from '../components/TicketFilterPanel.jsx';
import TicketList from '../components/TicketList.jsx';
import TicketDetail from '../components/TicketDetail.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchTickets } from '../services/api.js';

export default function TicketsPage() {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  // Load tickets from MongoDB through the protected backend API
  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError('');

    fetchTickets(token)
      .then((data) => {
        if (!ignore) {
          setTickets(data);
          setSelectedId(data[0]?.id ?? null);
        }
      })
      .catch((loadError) => {
        if (!ignore) {
          setError(loadError.message);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [token]);

  const filteredTickets = useMemo(() => {
    const query = searchText.toLowerCase();
    return tickets.filter((t) => {
      const matchesSearch =
        !query ||
        t.title.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query);
      const matchesStatus = !statusFilter || t.status === statusFilter;
      const matchesPriority = !priorityFilter || t.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, searchText, statusFilter, priorityFilter]);

  const selectedTicket = tickets.find((t) => t.id === selectedId) || null;

  if (loading) {
    return (
      <>
        <h2 className="page-title">Tickets</h2>
        <p className="ticket-form-loading">Loading tickets...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h2 className="page-title">Tickets</h2>
        <div className="ticket-form-error" role="alert">
          <p>{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="page-title">Tickets</h2>
      <div className="ticket-dashboard">
        <div className="ticket-list-column">
          <TicketFilterPanel
            searchText={searchText}
            onSearchChange={setSearchText}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
          />
          <TicketList
            tickets={filteredTickets}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
        <TicketDetail ticket={selectedTicket} />
      </div>
    </>
  );
}
