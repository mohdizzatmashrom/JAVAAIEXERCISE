export function filterAssets(assets, searchText, statusFilter) {
  const search = searchText.trim().toLowerCase();

  return assets.filter((asset) => {
    const matchesStatus = statusFilter === 'ALL' || asset.status === statusFilter;

    const matchesSearch =
      search.length === 0 ||
      asset.assetTag.toLowerCase().includes(search) ||
      asset.name.toLowerCase().includes(search) ||
      asset.category.toLowerCase().includes(search) ||
      asset.location.toLowerCase().includes(search);

    return matchesStatus && matchesSearch;
  });
}

export function countByStatus(assets, status) {
  return assets.filter((asset) => asset.status === status).length;
}
