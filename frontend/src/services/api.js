import { apiRequest, buildQueryString } from './httpClient.js';

export async function fetchApiInfo() {
  return apiRequest('/api/v1/info');
}

export async function fetchApiDocs() {
  return apiRequest('/api/docs');
}

export async function loginRequest(email, password) {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: { email, password }
  });
}

export async function fetchAssets(token) {
  return apiRequest('/api/v1/assets', { token });
}

export async function fetchPagedAssets(token, params) {
  const queryString = buildQueryString({
    page: params.page,
    size: params.size,
    sortBy: params.sortBy,
    direction: params.direction
  });

  return apiRequest(`/api/v1/assets/paged?${queryString}`, { token });
}

export async function fetchAssetById(id, token) {
  return apiRequest(`/api/v1/assets/${id}`, { token });
}

export async function createAsset(token, payload) {
  return apiRequest('/api/v1/assets', {
    method: 'POST',
    token,
    body: payload
  });
}

export async function updateAsset(id, token, payload) {
  return apiRequest(`/api/v1/assets/${id}`, {
    method: 'PUT',
    token,
    body: payload
  });
}

export async function fetchReport(path, token) {
  return apiRequest(path, { token });
}

export async function fetchAssetReports(token) {
  const [byStatus, byCategory, byLocation] = await Promise.all([
    fetchReport('/api/v1/reports/assets-by-status', token),
    fetchReport('/api/v1/reports/assets-by-category', token),
    fetchReport('/api/v1/reports/assets-by-location', token)
  ]);

  return { byStatus, byCategory, byLocation };
}
