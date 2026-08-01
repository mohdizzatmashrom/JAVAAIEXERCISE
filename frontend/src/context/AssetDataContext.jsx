import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { fetchPagedAssets, updateAsset } from '../services/api.js';
import { filterAssets } from '../utils/assets.js';
import { useAuth } from './AuthContext.jsx';

const AssetDataContext = createContext(null);

const initialState = {
  items: [],
  selectedAssetId: '',
  loading: false,
  error: '',
  cacheMessage: 'No cached page loaded yet.',
  updatingId: '',
  cache: {},
  pageInfo: {
    page: 0,
    size: 5,
    sortBy: 'assetTag',
    direction: 'asc',
    totalPages: 0,
    totalElements: 0
  },
  filters: {
    searchText: '',
    statusFilter: 'ALL'
  }
};

function makeCacheKey(params) {
  return `${params.page}|${params.size}|${params.sortBy}|${params.direction}`;
}

function replaceAsset(items, updatedAsset) {
  return items.map((asset) => (asset.id === updatedAsset.id ? updatedAsset : asset));
}

function replaceAssetInCache(cache, updatedAsset) {
  const nextCache = {};

  Object.entries(cache).forEach(([key, pageData]) => {
    nextCache[key] = {
      ...pageData,
      content: replaceAsset(pageData.content ?? [], updatedAsset)
    };
  });

  return nextCache;
}

function toPageInfo(data, fallback) {
  return {
    page: data.number ?? fallback.page,
    size: data.size ?? fallback.size,
    sortBy: fallback.sortBy,
    direction: fallback.direction,
    totalPages: data.totalPages ?? 0,
    totalElements: data.totalElements ?? 0
  };
}

function assetReducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return {
        ...state,
        loading: true,
        error: '',
        cacheMessage: action.fromCache ? 'Reading from cache...' : 'Fetching from backend...'
      };

    case 'LOAD_SUCCESS': {
      const items = action.data.content ?? [];
      const selectedStillVisible = items.some((asset) => asset.id === state.selectedAssetId);
      const selectedAssetId = selectedStillVisible ? state.selectedAssetId : items[0]?.id ?? '';
      const nextCache = action.fromCache
        ? state.cache
        : { ...state.cache, [action.cacheKey]: action.data };

      return {
        ...state,
        items,
        selectedAssetId,
        loading: false,
        error: '',
        pageInfo: toPageInfo(action.data, action.params),
        cache: nextCache,
        cacheMessage: action.fromCache ? 'Loaded from cache.' : 'Fetched from backend and cached.'
      };
    }

    case 'LOAD_ERROR':
      return {
        ...state,
        loading: false,
        error: action.message,
        cacheMessage: 'Could not load data.'
      };

    case 'SET_SEARCH_TEXT':
      return {
        ...state,
        filters: { ...state.filters, searchText: action.value }
      };

    case 'SET_STATUS_FILTER':
      return {
        ...state,
        filters: { ...state.filters, statusFilter: action.value }
      };

    case 'SELECT_ASSET':
      return {
        ...state,
        selectedAssetId: action.assetId
      };

    case 'OPTIMISTIC_UPDATE':
      return {
        ...state,
        updatingId: action.asset.id,
        items: replaceAsset(state.items, action.asset),
        cache: replaceAssetInCache(state.cache, action.asset)
      };

    case 'UPDATE_SUCCESS':
      return {
        ...state,
        updatingId: '',
        items: replaceAsset(state.items, action.asset),
        cache: replaceAssetInCache(state.cache, action.asset),
        cacheMessage: 'Optimistic update confirmed by backend.'
      };

    case 'ROLLBACK_UPDATE':
      return {
        ...state,
        updatingId: '',
        items: replaceAsset(state.items, action.asset),
        cache: replaceAssetInCache(state.cache, action.asset),
        error: action.message,
        cacheMessage: 'Optimistic update rolled back.'
      };

    default:
      return state;
  }
}

function toUpdatePayload(asset) {
  return {
    assetTag: asset.assetTag,
    name: asset.name,
    category: asset.category,
    serialNumber: asset.serialNumber,
    status: asset.status,
    location: asset.location,
    assignedTo: asset.assignedTo ?? ''
  };
}

export function AssetDataProvider({ children }) {
  const { token } = useAuth();
  const [state, dispatch] = useReducer(assetReducer, initialState);

  const loadAssetsPage = useCallback(async (overrides = {}) => {
    const params = {
      page: overrides.page ?? state.pageInfo.page,
      size: overrides.size ?? state.pageInfo.size,
      sortBy: overrides.sortBy ?? state.pageInfo.sortBy,
      direction: overrides.direction ?? state.pageInfo.direction
    };

    const cacheKey = makeCacheKey(params);
    const cachedPage = state.cache[cacheKey];

    if (cachedPage && !overrides.force) {
      dispatch({
        type: 'LOAD_SUCCESS',
        data: cachedPage,
        params,
        cacheKey,
        fromCache: true
      });
      return;
    }

    dispatch({ type: 'LOAD_START', fromCache: false });

    try {
      const data = await fetchPagedAssets(token, params);
      dispatch({
        type: 'LOAD_SUCCESS',
        data,
        params,
        cacheKey,
        fromCache: false
      });
    } catch (error) {
      dispatch({
        type: 'LOAD_ERROR',
        message: error.message || 'Could not load paged assets.'
      });
    }
  }, [state.cache, state.pageInfo, token]);

  const refreshAssets = useCallback(() => {
    return loadAssetsPage({ force: true });
  }, [loadAssetsPage]);

  const setSearchText = useCallback((value) => {
    dispatch({ type: 'SET_SEARCH_TEXT', value });
  }, []);

  const setStatusFilter = useCallback((value) => {
    dispatch({ type: 'SET_STATUS_FILTER', value });
  }, []);

  const selectAsset = useCallback((assetId) => {
    dispatch({ type: 'SELECT_ASSET', assetId });
  }, []);

  const changeAssetStatus = useCallback(async (assetId, nextStatus) => {
    const currentAsset = state.items.find((asset) => asset.id === assetId);

    if (!currentAsset || currentAsset.status === nextStatus) {
      return;
    }

    const optimisticAsset = { ...currentAsset, status: nextStatus };
    dispatch({ type: 'OPTIMISTIC_UPDATE', asset: optimisticAsset });

    try {
      const savedAsset = await updateAsset(assetId, token, toUpdatePayload(optimisticAsset));
      dispatch({ type: 'UPDATE_SUCCESS', asset: savedAsset });
    } catch (error) {
      dispatch({
        type: 'ROLLBACK_UPDATE',
        asset: currentAsset,
        message: error.message || 'Could not update asset status. Reverted local change.'
      });
    }
  }, [state.items, token]);

  const visibleAssets = useMemo(
    () => filterAssets(state.items, state.filters.searchText, state.filters.statusFilter),
    [state.items, state.filters]
  );

  const selectedAsset = useMemo(() => {
    return visibleAssets.find((asset) => asset.id === state.selectedAssetId) ?? visibleAssets[0] ?? null;
  }, [state.selectedAssetId, visibleAssets]);

  const value = useMemo(
    () => ({
      ...state,
      visibleAssets,
      selectedAsset,
      loadAssetsPage,
      refreshAssets,
      setSearchText,
      setStatusFilter,
      selectAsset,
      changeAssetStatus
    }),
    [state, visibleAssets, selectedAsset, loadAssetsPage, refreshAssets, setSearchText, setStatusFilter, selectAsset, changeAssetStatus]
  );

  return <AssetDataContext.Provider value={value}>{children}</AssetDataContext.Provider>;
}

export function useAssetData() {
  const value = useContext(AssetDataContext);

  if (!value) {
    throw new Error('useAssetData must be used inside AssetDataProvider');
  }

  return value;
}
