import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { fetchTickets } from '../services/api.js';
import { useAuth } from './AuthContext.jsx';

const TicketDataContext = createContext(null);

/* ------------------------------------------------------------------ */
/*  Initial state                                                      */
/* ------------------------------------------------------------------ */

const initialState = {
  tickets: [],
  selectedId: null,
  loading: false,
  error: '',
  pageInfo: {
    page: 0,
    size: 20,
    totalPages: 0,
    totalElements: 0
  },
  filters: {
    searchText: '',
    statusFilter: '',
    priorityFilter: ''
  }
};

/* ------------------------------------------------------------------ */
/*  Reducer                                                            */
/* ------------------------------------------------------------------ */

function ticketReducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, loading: true, error: '' };

    case 'LOAD_SUCCESS': {
      const tickets = action.data;
      const selectedStillVisible = tickets.some((t) => t.id === state.selectedId);
      return {
        ...state,
        tickets,
        selectedId: selectedStillVisible ? state.selectedId : (tickets[0]?.id ?? null),
        loading: false,
        error: '',
        pageInfo: {
          ...state.pageInfo,
          totalElements: tickets.length,
          totalPages: 1
        }
      };
    }

    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.message };

    case 'SET_SEARCH_TEXT':
      return { ...state, filters: { ...state.filters, searchText: action.value } };

    case 'SET_STATUS_FILTER':
      return { ...state, filters: { ...state.filters, statusFilter: action.value } };

    case 'SET_PRIORITY_FILTER':
      return { ...state, filters: { ...state.filters, priorityFilter: action.value } };

    case 'SELECT_TICKET':
      return { ...state, selectedId: action.ticketId };

    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function TicketDataProvider({ children }) {
  const { token, isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  /* Load tickets only when the user is authenticated */
  const loadTickets = useCallback(() => {
    if (!token) return;

    dispatch({ type: 'LOAD_START' });

    fetchTickets(token)
      .then((data) => dispatch({ type: 'LOAD_SUCCESS', data }))
      .catch((err) => dispatch({ type: 'LOAD_ERROR', message: err.message }));
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) {
      loadTickets();
    }
  }, [isAuthenticated, loadTickets]);

  /* Stable action dispatchers */
  const setSearchText = useCallback((value) => {
    dispatch({ type: 'SET_SEARCH_TEXT', value });
  }, []);

  const setStatusFilter = useCallback((value) => {
    dispatch({ type: 'SET_STATUS_FILTER', value });
  }, []);

  const setPriorityFilter = useCallback((value) => {
    dispatch({ type: 'SET_PRIORITY_FILTER', value });
  }, []);

  const selectTicket = useCallback((ticketId) => {
    dispatch({ type: 'SELECT_TICKET', ticketId });
  }, []);

  /* Derived values ------------------------------------------------- */

  const filteredTickets = useMemo(() => {
    const query = state.filters.searchText.toLowerCase();
    return state.tickets.filter((t) => {
      const matchesSearch =
        !query ||
        t.title.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query);
      const matchesStatus = !state.filters.statusFilter || t.status === state.filters.statusFilter;
      const matchesPriority = !state.filters.priorityFilter || t.priority === state.filters.priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [state.tickets, state.filters]);

  const selectedTicket = useMemo(
    () => state.tickets.find((t) => t.id === state.selectedId) ?? null,
    [state.tickets, state.selectedId]
  );

  /* Context value -------------------------------------------------- */

  const value = useMemo(
    () => ({
      ...state,
      filteredTickets,
      selectedTicket,
      loadTickets,
      setSearchText,
      setStatusFilter,
      setPriorityFilter,
      selectTicket
    }),
    [state, filteredTickets, selectedTicket, loadTickets, setSearchText, setStatusFilter, setPriorityFilter, selectTicket]
  );

  return <TicketDataContext.Provider value={value}>{children}</TicketDataContext.Provider>;
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useTicketData() {
  const value = useContext(TicketDataContext);

  if (!value) {
    throw new Error('useTicketData must be used inside TicketDataProvider');
  }

  return value;
}
