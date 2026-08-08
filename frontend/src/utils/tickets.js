export function filterTickets(tickets, searchText, statusFilter) {
  const search = searchText.trim().toLowerCase();

  return tickets.filter((ticket) => {
    const matchesStatus = statusFilter === 'ALL' || ticket.status === statusFilter;

    const matchesSearch =
      search.length === 0 ||
      ticket.id.toLowerCase().includes(search) ||
      ticket.title.toLowerCase().includes(search) ||
      ticket.category.toLowerCase().includes(search);

    return matchesStatus && matchesSearch;
  });
}

export function countByStatus(tickets, status) {
  return tickets.filter((ticket) => ticket.status === status).length;
}
