async function parseJsonResponse(response) {
  const contentType = response.headers.get('content-type') ?? '';
  const body = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const message = body?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return body;
}

function authHeaders(token, extraHeaders = {}) {
  return {
    Authorization: `Bearer ${token}`,
    ...extraHeaders
  };
}

export async function fetchApiInfo() {
  const response = await fetch('/api/v1/info');
  return parseJsonResponse(response);
}

export async function fetchApiDocs() {
  const response = await fetch('/api/docs');
  return parseJsonResponse(response);
}

export async function loginRequest(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  return parseJsonResponse(response);
}

export async function fetchAssets(token) {
  const response = await fetch('/api/v1/assets', {
    headers: authHeaders(token)
  });

  return parseJsonResponse(response);
}

export async function fetchAssetById(id, token) {
  const response = await fetch(`/api/v1/assets/${id}`, {
    headers: authHeaders(token)
  });

  return parseJsonResponse(response);
}

export async function createAsset(token, payload) {
  const response = await fetch('/api/v1/assets', {
    method: 'POST',
    headers: authHeaders(token, {
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(payload)
  });

  return parseJsonResponse(response);
}

export async function updateAsset(id, token, payload) {
  const response = await fetch(`/api/v1/assets/${id}`, {
    method: 'PUT',
    headers: authHeaders(token, {
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(payload)
  });

  return parseJsonResponse(response);
}

export async function fetchReport(path, token) {
  const response = await fetch(path, {
    headers: authHeaders(token)
  });

  return parseJsonResponse(response);
}

export async function fetchAssetReports(token) {
  const [byStatus, byCategory, byLocation] = await Promise.all([
    fetchReport('/api/v1/reports/assets-by-status', token),
    fetchReport('/api/v1/reports/assets-by-category', token),
    fetchReport('/api/v1/reports/assets-by-location', token)
  ]);

  return { byStatus, byCategory, byLocation };
}
