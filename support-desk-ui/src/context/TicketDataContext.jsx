import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { fetchPagedTickets } from '../services/api.js';
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
    size: 5,
    totalPages: 0,
    totalElements: 0
  },
  sort: {
    sortBy: 'createdAt',
    direction: 'desc'
  },
  filters: {
    searchText: '',
    statusFilter: ''
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
      const pageData = action.data;
      const tickets = pageData.content ?? [];
      const selectedStillVisible = tickets.some((t) => t.id === state.selectedId);
      return {
        ...state,
        tickets,
        selectedId: selectedStillVisible ? state.selectedId : (tickets[0]?.id ?? null),
        loading: false,
        error: '',
        pageInfo: {
          page: pageData.number ?? state.pageInfo.page,
          size: pageData.size ?? state.pageInfo.size,
          totalPages: pageData.totalPages ?? 0,
          totalElements: pageData.totalElements ?? 0
        }
      };
    }

    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.message };

    case 'SET_SEARCH_TEXT':
      return { ...state, filters: { ...state.filters, searchText: action.value } };

    case 'SET_STATUS_FILTER':
      return { ...state, filters: { ...state.filters, statusFilter: action.value } };

    case 'SET_PAGE':
      return { ...state, pageInfo: { ...state.pageInfo, page: action.value } };

    case 'SET_PAGE_SIZE':
      return { ...state, pageInfo: { ...state.pageInfo, size: action.value, page: 0 } };

    case 'SET_SORT_BY':
      return { ...state, sort: { ...state.sort, sortBy: action.value } };

    case 'SET_SORT_DIRECTION':
      return { ...state, sort: { ...state.sort, direction: action.value } };

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

  /* Load tickets from the paged endpoint */
  const loadTickets = useCallback(() => {
    if (!token) return;

    dispatch({ type: 'LOAD_START' });

    fetchPagedTickets(token, {
      page: state.pageInfo.page,
      size: state.pageInfo.size,
      sortBy: state.sort.sortBy,
      direction: state.sort.direction,
      status: state.filters.statusFilter,
      searchText: state.filters.searchText
    })
      .then((data) => dispatch({ type: 'LOAD_SUCCESS', data }))
      .catch((err) => dispatch({ type: 'LOAD_ERROR', message: err.message }));
  }, [token, state.pageInfo.page, state.pageInfo.size, state.sort.sortBy, state.sort.direction, state.filters.statusFilter, state.filters.searchText]);

  useEffect(() => {
    if (isAuthenticated) {
      loadTickets();
    }
  }, [isAuthenticated, loadTickets]);

  /* Stable action dispatchers */
  const setSearchText = useCallback((value) => {
    dispatch({ type: 'SET_SEARCH_TEXT', value });
    dispatch({ type: 'SET_PAGE', value: 0 });
  }, []);

  const setStatusFilter = useCallback((value) => {
    dispatch({ type: 'SET_STATUS_FILTER', value });
    dispatch({ type: 'SET_PAGE', value: 0 });
  }, []);

  const setPage = useCallback((value) => {
    dispatch({ type: 'SET_PAGE', value });
  }, []);

  const setPageSize = useCallback((value) => {
    dispatch({ type: 'SET_PAGE_SIZE', value });
  }, []);

  const setSortBy = useCallback((value) => {
    dispatch({ type: 'SET_SORT_BY', value });
    dispatch({ type: 'SET_PAGE', value: 0 });
  }, []);

  const setSortDirection = useCallback((value) => {
    dispatch({ type: 'SET_SORT_DIRECTION', value });
    dispatch({ type: 'SET_PAGE', value: 0 });
  }, []);

  const selectTicket = useCallback((ticketId) => {
    dispatch({ type: 'SELECT_TICKET', ticketId });
  }, []);

  /* Derived values ------------------------------------------------- */

  const selectedTicket = useMemo(
    () => state.tickets.find((t) => t.id === state.selectedId) ?? null,
    [state.tickets, state.selectedId]
  );

  /* Context value -------------------------------------------------- */

  const value = useMemo(
    () => ({
      ...state,
      selectedTicket,
      loadTickets,
      setSearchText,
      setStatusFilter,
      setPage,
      setPageSize,
      setSortBy,
      setSortDirection,
      selectTicket
    }),
    [state, selectedTicket, loadTickets, setSearchText, setStatusFilter, setPage, setPageSize, setSortBy, setSortDirection, selectTicket]
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
