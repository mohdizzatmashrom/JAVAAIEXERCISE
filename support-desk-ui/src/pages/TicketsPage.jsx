import { useTicketData } from '../context/TicketDataContext.jsx';
import TicketFilterPanel from '../components/TicketFilterPanel.jsx';
import TicketList from '../components/TicketList.jsx';
import TicketDetail from '../components/TicketDetail.jsx';
import PaginationControls from '../components/PaginationControls.jsx';

export default function TicketsPage() {
  const {
    loading,
    error,
    tickets,
    pageInfo,
    sort,
    selectedId,
    selectedTicket,
    filters,
    setSearchText,
    setStatusFilter,
    setPage,
    setPageSize,
    setSortBy,
    setSortDirection,
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
            sortBy={sort.sortBy}
            onSortByChange={setSortBy}
            direction={sort.direction}
            onDirectionChange={setSortDirection}
            pageSize={pageInfo.size}
            onPageSizeChange={setPageSize}
          />
          <TicketList
            tickets={tickets}
            selectedId={selectedId}
            onSelect={selectTicket}
          />
          <PaginationControls
            page={pageInfo.page}
            totalPages={pageInfo.totalPages}
            totalElements={pageInfo.totalElements}
            onPrev={() => setPage(pageInfo.page - 1)}
            onNext={() => setPage(pageInfo.page + 1)}
          />
        </div>
        <TicketDetail ticket={selectedTicket} />
      </div>
    </>
  );
}
