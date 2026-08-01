import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import AssetFormWizard, { emptyAssetForm } from '../components/AssetFormWizard.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { createAsset, fetchAssetById, updateAsset } from '../services/api.js';

export default function AssetFormPage() {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [initialValues, setInitialValues] = useState(emptyAssetForm);
  const [loading, setLoading] = useState(Boolean(assetId));
  const [loadError, setLoadError] = useState('');
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const isEditMode = Boolean(assetId);
  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    let ignore = false;

    async function loadAssetForEdit() {
      if (!assetId) {
        return;
      }

      try {
        setLoading(true);
        setLoadError('');
        const asset = await fetchAssetById(assetId, token);

        if (!ignore) {
          setInitialValues({
            assetTag: asset.assetTag ?? '',
            name: asset.name ?? '',
            category: asset.category ?? '',
            serialNumber: asset.serialNumber ?? '',
            status: asset.status ?? 'AVAILABLE',
            location: asset.location ?? '',
            assignedTo: asset.assignedTo ?? ''
          });
        }
      } catch (err) {
        if (!ignore) {
          setLoadError(err.message || 'Could not load asset for editing.');
          console.error(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadAssetForEdit();

    return () => {
      ignore = true;
    };
  }, [assetId, token]);

  async function handleSubmit(payload) {
    try {
      setSaving(true);
      setServerError('');
      setSuccessMessage('');

      if (isEditMode) {
        await updateAsset(assetId, token, payload);
        setSuccessMessage('Asset updated successfully.');
      } else {
        const createPayload = {
          assetTag: payload.assetTag,
          name: payload.name,
          category: payload.category,
          serialNumber: payload.serialNumber,
          location: payload.location
        };

        await createAsset(token, createPayload);
        setSuccessMessage('Asset created successfully.');
      }
    } catch (err) {
      setServerError(err.message || 'Could not save asset.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  if (!isAdmin) {
    return (
      <section className="card">
        <div className="section-heading">
          <p className="eyebrow">Admin only</p>
          <h2>Asset form is restricted</h2>
          <p>Only ADMIN users can create or update assets in this demo.</p>
        </div>
        <Link className="button-link" to="/app/assets">Back to Assets</Link>
      </section>
    );
  }

  if (loading) {
    return <LoadingMessage message="Loading asset form..." />;
  }

  if (loadError) {
    return <ErrorMessage message={loadError} />;
  }

  return (
    <>
      <section className="card welcome-card">
        <div>
          <p className="eyebrow">Forms & validation</p>
          <h2>{isEditMode ? 'Edit existing asset' : 'Create a new asset'}</h2>
          <p>
            The visual style is intentionally kept close to Day 12. Today focuses on form behaviour.
          </p>
        </div>
        <div className="action-row">
          <Link className="button-link secondary" to="/app/assets">Back to Assets</Link>
          {successMessage && (
            <button type="button" className="button-link" onClick={() => navigate('/app/assets')}>
              View Assets
            </button>
          )}
        </div>
      </section>

      <AssetFormWizard
        key={assetId || 'create'}
        mode={isEditMode ? 'edit' : 'create'}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        saving={saving}
        serverError={serverError}
        successMessage={successMessage}
      />
    </>
  );
}
