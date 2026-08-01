import { useState, useMemo } from 'react';
import TicketFilterPanel from '../components/TicketFilterPanel.jsx';
import TicketList from '../components/TicketList.jsx';
import TicketDetail from '../components/TicketDetail.jsx';
import sampleTickets from '../data/sampleTickets.js';

export default function TicketsPage() {
  const [selectedId, setSelectedId] = useState(sampleTickets[0].id);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const filteredTickets = useMemo(() => {
    const query = searchText.toLowerCase();
    return sampleTickets.filter((t) => {
      const matchesSearch =
        !query ||
        t.title.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query);
      const matchesStatus = !statusFilter || t.status === statusFilter;
      const matchesPriority = !priorityFilter || t.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [searchText, statusFilter, priorityFilter]);

  const selectedTicket = sampleTickets.find((t) => t.id === selectedId) || null;

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
