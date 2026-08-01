async function parseJsonResponse(response) {
  const contentType = response.headers.get('content-type') ?? '';
  const body = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    let message = body?.message || `Request failed with status ${response.status}`;

    // Append field-level details from the backend validation response, if any
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

export async function fetchApiInfo() {
  const response = await fetch('/api/v1/info');
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

export async function fetchTickets(token) {
  const response = await fetch('/api/v1/tickets', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return parseJsonResponse(response);
}

export async function fetchTicketById(id, token) {
  const response = await fetch(`/api/v1/tickets/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return parseJsonResponse(response);
}

export async function createTicket(token, payload) {
  const response = await fetch('/api/v1/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  return parseJsonResponse(response);
}

export async function updateTicket(id, token, payload) {
  const response = await fetch(`/api/v1/tickets/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  return parseJsonResponse(response);
}
