import { useTicketData } from '../context/TicketDataContext.jsx';
import TicketFilterPanel from '../components/TicketFilterPanel.jsx';
import TicketList from '../components/TicketList.jsx';
import TicketDetail from '../components/TicketDetail.jsx';

export default function TicketsPage() {
  const {
    loading,
    error,
    filteredTickets,
    selectedId,
    selectedTicket,
    filters,
    setSearchText,
    setStatusFilter,
    setPriorityFilter,
    selectTicket
  } = useTicketData();

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
            searchText={filters.searchText}
            onSearchChange={setSearchText}
            statusFilter={filters.statusFilter}
            onStatusChange={setStatusFilter}
            priorityFilter={filters.priorityFilter}
            onPriorityChange={setPriorityFilter}
          />
          <TicketList
            tickets={filteredTickets}
            selectedId={selectedId}
            onSelect={selectTicket}
          />
        </div>
        <TicketDetail ticket={selectedTicket} />
      </div>
    </>
  );
}
