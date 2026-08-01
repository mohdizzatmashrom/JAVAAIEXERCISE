/**
 * Reusable HTTP client for the Support Desk backend.
 *
 * Centralises JSON serialisation, the Authorization header, and
 * error-message extraction so that individual API helpers stay
 * focused on *what* they request rather than *how* the fetch is
 * wired up.
 */

const BASE_URL = '/api';

/**
 * Make an API request.
 *
 * @param {string}  path              - Path relative to BASE_URL (e.g. "/v1/tickets").
 * @param {object}  [options]
 * @param {string}  [options.method]  - HTTP method (default "GET").
 * @param {string}  [options.token]   - JWT token; when provided an Authorization header is added.
 * @param {object}  [options.body]    - Request payload – will be JSON-stringified automatically.
 * @param {object}  [options.headers] - Extra headers merged on top of the defaults.
 * @returns {Promise<any>} Parsed JSON response body (or null for non-JSON responses).
 *
 * @throws {Error} When the response is not ok.  The message is built from the
 *                 backend's `message` field plus any field-level `errors`.
 */
export async function apiRequest(path, options = {}) {
  const { method = 'GET', token, body, headers: extraHeaders = {} } = options;

  const headers = {
    'Content-Type': 'application/json',
    ...extraHeaders
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = { method, headers };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${path}`, config);

  return parseJsonResponse(response);
}

/* ------------------------------------------------------------------ */
/*  Internal helpers                                                    */
/* ------------------------------------------------------------------ */

async function parseJsonResponse(response) {
  const contentType = response.headers.get('content-type') ?? '';
  const body = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    let message = body?.message || `Request failed with status ${response.status}`;

    const fieldDetails = (body?.errors ?? [])
      .map((error) => `${error.field}: ${error.message}`)
      .join('; ');

    if (fieldDetails) {
      message = `${message} (${fieldDetails})`;
    }

    throw new Error(message);
  }

  return body;
}
