import { apiRequest } from './httpClient.js';

export async function fetchApiInfo() {
  return apiRequest('/v1/info');
}

export async function loginRequest(email, password) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: { email, password }
  });
}

export async function fetchTickets(token) {
  return apiRequest('/v1/tickets', { token });
}

export async function fetchTicketById(id, token) {
  return apiRequest(`/v1/tickets/${id}`, { token });
}

export async function createTicket(token, payload) {
  return apiRequest('/v1/tickets', {
    method: 'POST',
    token,
    body: payload
  });
}

export async function updateTicket(id, token, payload) {
  return apiRequest(`/v1/tickets/${id}`, {
    method: 'PUT',
    token,
    body: payload
  });
}
