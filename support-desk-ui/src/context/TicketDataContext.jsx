import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import { fetchPagedTickets, updateTicket } from '../services/api.js';
import { useAuth } from './AuthContext.jsx';

const TicketDataContext = createContext(null);

/* ------------------------------------------------------------------ */
/*  In-memory page cache (module-level, survives re-renders)           */
/* ------------------------------------------------------------------ */

const pageCache = new Map();

function buildCacheKey({ page, size, sortBy, direction, status, searchText }) {
  return `${page}|${size}|${sortBy}|${direction}|${status ?? ''}|${searchText ?? ''}`;
}

/* ------------------------------------------------------------------ */
/*  Initial state                                                      */
/* ------------------------------------------------------------------ */

const initialState = {
  tickets: [],
  selectedId: null,
  loading: false,
  error: '',
  cacheMessage: '',
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
      return { ...state, loading: true, error: '', cacheMessage: '' };

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
        cacheMessage: action.cacheMessage ?? '',
        pageInfo: {
          page: pageData.number ?? state.pageInfo.page,
          size: pageData.size ?? state.pageInfo.size,
          totalPages: pageData.totalPages ?? 0,
          totalElements: pageData.totalElements ?? 0
        }
      };
    }

    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.message, cacheMessage: '' };

    case 'SET_CACHE_MESSAGE':
      return { ...state, cacheMessage: action.value };

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

    case 'OPTIMISTIC_STATUS_UPDATE': {
      const updatedTickets = state.tickets.map((t) =>
        t.id === action.ticketId ? { ...t, status: action.newStatus } : t
      );
      return { ...state, tickets: updatedTickets };
    }

    case 'ROLLBACK_STATUS': {
      const rolledBack = state.tickets.map((t) =>
        t.id === action.backupTicket.id ? action.backupTicket : t
      );
      return { ...state, tickets: rolledBack, error: action.message };
    }

    case 'CONFIRM_STATUS_UPDATE': {
      const confirmed = state.tickets.map((t) =>
        t.id === action.updatedTicket.id ? action.updatedTicket : t
      );
      return { ...state, tickets: confirmed };
    }

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

  /* Use a ref to always have the latest state inside loadTickets
     without re-creating the callback on every state change.         */
  const stateRef = useRef(state);
  stateRef.current = state;

  /* Core fetch helper – called by both loadTickets and refreshTickets */
  const doFetch = useCallback((forceRefresh) => {
    if (!token) return;

    const s = stateRef.current;
    const params = {
      page: s.pageInfo.page,
      size: s.pageInfo.size,
      sortBy: s.sort.sortBy,
      direction: s.sort.direction,
      status: s.filters.statusFilter,
      searchText: s.filters.searchText
    };
    const cacheKey = buildCacheKey(params);

    // Check cache first (unless force-refresh)
    if (!forceRefresh && pageCache.has(cacheKey)) {
      const cached = pageCache.get(cacheKey);
      dispatch({ type: 'LOAD_SUCCESS', data: cached, cacheMessage: 'Loaded from cache' });
      return;
    }

    dispatch({ type: 'LOAD_START' });

    fetchPagedTickets(token, params)
      .then((data) => {
        // Store in cache
        pageCache.set(cacheKey, data);
        dispatch({ type: 'LOAD_SUCCESS', data, cacheMessage: 'Fetched from backend' });
      })
      .catch((err) => dispatch({ type: 'LOAD_ERROR', message: err.message }));
  }, [token]);

  /* Load tickets – uses cache when available */
  const loadTickets = useCallback(() => {
    doFetch(false);
  }, [doFetch]);

  /* Refresh – always fetches from backend, updates cache */
  const refreshTickets = useCallback(() => {
    doFetch(true);
  }, [doFetch]);

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

  /* Optimistic status update ---------------------------------------- */

  const updateTicketStatus = useCallback((ticketId, newStatus) => {
    if (!token) return;

    const s = stateRef.current;
    const currentTicket = s.tickets.find((t) => t.id === ticketId);
    if (!currentTicket || currentTicket.status === newStatus) return;

    // 1. Save backup
    const backupTicket = { ...currentTicket };

    // 2. Update UI immediately (optimistic)
    dispatch({ type: 'OPTIMISTIC_STATUS_UPDATE', ticketId, newStatus });

    // 3. Build payload for PUT request
    const payload = {
      title: currentTicket.title,
      description: currentTicket.description,
      category: currentTicket.category,
      priority: currentTicket.priority,
      status: newStatus
    };

    // 4. Send PUT request
    updateTicket(ticketId, token, payload)
      .then((updatedTicket) => {
        // 5a. Success – replace optimistic data with backend response
        dispatch({ type: 'CONFIRM_STATUS_UPDATE', updatedTicket });
        // Invalidate page cache since data changed
        pageCache.clear();
      })
      .catch((err) => {
        // 5b. Failure – roll back to backup
        dispatch({ type: 'ROLLBACK_STATUS', backupTicket, message: err.message });
      });
  }, [token]);

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
      refreshTickets,
      setSearchText,
      setStatusFilter,
      setPage,
      setPageSize,
      setSortBy,
      setSortDirection,
      selectTicket,
      updateTicketStatus
    }),
    [state, selectedTicket, loadTickets, refreshTickets, setSearchText, setStatusFilter, setPage, setPageSize, setSortBy, setSortDirection, selectTicket, updateTicketStatus]
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
