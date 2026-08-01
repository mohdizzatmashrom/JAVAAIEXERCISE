import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import AssetDetail from '../components/AssetDetail.jsx';
import AssetList from '../components/AssetList.jsx';
import DataControls from '../components/DataControls.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import FilterPanel from '../components/FilterPanel.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import OptimisticStatusControls from '../components/OptimisticStatusControls.jsx';
import PaginationControls from '../components/PaginationControls.jsx';
import SummaryCards from '../components/SummaryCards.jsx';
import { useAssetData } from '../context/AssetDataContext.jsx';

export default function AssetsPage() {
  const initialLoadRef = useRef(false);

  const {
    items,
    visibleAssets,
    selectedAsset,
    selectedAssetId,
    loading,
    error,
    pageInfo,
    filters,
    cacheMessage,
    updatingId,
    loadAssetsPage,
    refreshAssets,
    setSearchText,
    setStatusFilter,
    selectAsset,
    changeAssetStatus
  } = useAssetData();

  useEffect(() => {
    if (initialLoadRef.current) {
      return;
    }

    initialLoadRef.current = true;
    loadAssetsPage();
  }, [loadAssetsPage]);

  return (
    <>
      <SummaryCards assets={items} />

      <DataControls
        pageInfo={pageInfo}
        cacheMessage={cacheMessage}
        loading={loading}
        onRefresh={refreshAssets}
        onPageSizeChange={(size) => loadAssetsPage({ page: 0, size })}
        onSortChange={(sortBy, direction) => loadAssetsPage({ page: 0, sortBy, direction })}
      />

      <FilterPanel
        searchText={filters.searchText}
        statusFilter={filters.statusFilter}
        onSearchChange={setSearchText}
        onStatusChange={setStatusFilter}
      />

      {loading && <LoadingMessage message="Loading asset page..." />}
      {error && <ErrorMessage message={error} />}

      <section className="workspace-grid">
        <AssetList
          assets={visibleAssets}
          selectedAssetId={selectedAssetId || selectedAsset?.id}
          onSelectAsset={(asset) => selectAsset(asset.id)}
        />
        <div className="asset-list">
          <AssetDetail asset={selectedAsset} />
          <OptimisticStatusControls
            asset={selectedAsset}
            updatingId={updatingId}
            onStatusChange={changeAssetStatus}
          />
          {selectedAsset && (
            <Link className="button-link secondary" to={`/app/assets/${selectedAsset.id}/edit`}>
              Edit selected asset
            </Link>
          )}
        </div>
      </section>

      <PaginationControls
        pageInfo={pageInfo}
        loading={loading}
        onPageChange={(page) => loadAssetsPage({ page })}
      />
    </>
  );
}
