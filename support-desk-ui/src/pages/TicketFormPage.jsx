import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import TicketFormWizard from '../components/TicketFormWizard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { createTicket, fetchTicketById, updateTicket } from '../services/api.js';

export default function TicketFormPage() {
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const { token, user } = useAuth();
  const isEditMode = Boolean(ticketId);

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [savedTicket, setSavedTicket] = useState(null);
  const [error, setError] = useState('');

  // In edit mode, load the existing ticket so the form starts pre-filled
  useEffect(() => {
    if (!isEditMode) {
      setInitialValues(null);
      setLoading(false);
      setSavedTicket(null);
      setError('');
      return;
    }

    let ignore = false;
    setLoading(true);
    setSavedTicket(null);
    setError('');

    fetchTicketById(ticketId, token)
      .then((ticket) => {
        if (!ignore) {
          setInitialValues({
            title: ticket.title ?? '',
            description: ticket.description ?? '',
            category: ticket.category ?? '',
            priority: ticket.priority ?? '',
            status: ticket.status ?? ''
          });
        }
      })
      .catch((loadError) => {
        if (!ignore) {
          setError(loadError.message);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [ticketId, isEditMode, token]);

  async function handleSubmit(payload) {
    setSaving(true);
    setSavedTicket(null);
    setError('');

    try {
      const ticket = isEditMode
        ? await updateTicket(ticketId, token, payload)
        : await createTicket(token, {
            ...payload,
            // Backend requires createdBy on create; use the logged-in user
            createdBy: user?.email ?? 'unknown@example.com'
          });

      setSavedTicket(ticket);
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <h2 className="page-title">{isEditMode ? 'Edit Ticket' : 'New Ticket'}</h2>

      {error && (
        <div className="ticket-form-error" role="alert">
          <p>{error}</p>
        </div>
      )}

      {savedTicket && (
        <div className="card ticket-form-success" role="status">
          <p>Ticket {isEditMode ? 'updated' : 'created'} successfully:</p>
          <dl className="detail-fields">
            <div className="detail-row">
              <dt>ID</dt>
              <dd>{savedTicket.id}</dd>
            </div>
            <div className="detail-row">
              <dt>Title</dt>
              <dd>{savedTicket.title}</dd>
            </div>
            <div className="detail-row">
              <dt>Description</dt>
              <dd>{savedTicket.description}</dd>
            </div>
            <div className="detail-row">
              <dt>Category</dt>
              <dd>{savedTicket.category}</dd>
            </div>
            <div className="detail-row">
              <dt>Priority</dt>
              <dd>{savedTicket.priority}</dd>
            </div>
            <div className="detail-row">
              <dt>Status</dt>
              <dd>{savedTicket.status}</dd>
            </div>
          </dl>
          <div className="form-actions">
            <button
              type="button"
              className="button-link secondary"
              onClick={() => navigate('/app/tickets')}
            >
              Back to Tickets
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="ticket-form-loading">Loading ticket...</p>
      ) : (
        (!isEditMode || initialValues) && (
          <TicketFormWizard
            key={ticketId ?? 'new'}
            initialValues={initialValues ?? undefined}
            onSubmit={handleSubmit}
            saving={saving}
            submitLabel={isEditMode ? 'Save Changes' : 'Create Ticket'}
          />
        )
      )}
    </>
  );
}
