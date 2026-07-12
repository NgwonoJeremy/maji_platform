import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_ESTATES = ['Greenwood Estates', 'Kilimani Heights', 'South C Enclave'];
const ADD_NEW_VALUE = '__add_new__';

const VendorRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    estateCoverage: 'Greenwood Estates',
    capacityLiters: '',
    agreedToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- Dynamic estate list ---
  const [estates, setEstates] = useState(DEFAULT_ESTATES);
  const [showAddEstate, setShowAddEstate] = useState(false);
  const [newEstateName, setNewEstateName] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEstateSelect = (e) => {
    const value = e.target.value;
    if (value === ADD_NEW_VALUE) {
      setShowAddEstate(true);
      return;
    }
    setFormData(prev => ({ ...prev, estateCoverage: value }));
  };

  const handleAddEstate = () => {
    const trimmed = newEstateName.trim();
    if (trimmed.length < 3) {
      alert('Please enter a valid estate name (at least 3 characters).');
      return;
    }
    if (estates.some(e => e.toLowerCase() === trimmed.toLowerCase())) {
      alert('That estate is already in the list.');
      return;
    }
    setEstates(prev => [...prev, trimmed]);
    setFormData(prev => ({ ...prev, estateCoverage: trimmed }));
    setNewEstateName('');
    setShowAddEstate(false);
  };

  // --- Validation ---
  // Kenyan phone: 07XXXXXXXX, 01XXXXXXXX, or +2547XXXXXXXX / +2541XXXXXXXX (spaces allowed)
  const PHONE_REGEX = /^(?:\+254|0)[71]\d{8}$/;
  // Letters, spaces, apostrophes, hyphens only — no digits or symbols
  const NAME_REGEX = /^[A-Za-z][A-Za-z\s'\-]{1,59}$/;
  // Business name: letters/numbers/spaces/basic punctuation, not just repeated junk
  const BUSINESS_NAME_REGEX = /^[A-Za-z0-9][A-Za-z0-9\s&.,'\-]{2,79}$/;

  const isGibberish = (value) => {
    // Flags strings like "asdasd", "aaaaaa", "1111" — same char/pair repeated across the whole string
    const cleaned = value.replace(/\s/g, '');
    if (cleaned.length < 3) return false;
    const uniqueChars = new Set(cleaned.toLowerCase()).size;
    return uniqueChars <= 2 && cleaned.length >= 4;
  };

  const validate = () => {
    const newErrors = {};
    const phoneNormalized = formData.phone.replace(/\s/g, '');

    if (!BUSINESS_NAME_REGEX.test(formData.businessName.trim()) || isGibberish(formData.businessName)) {
      newErrors.businessName = 'Enter a real business/station name (3-80 characters, letters & numbers only).';
    }

    if (!NAME_REGEX.test(formData.ownerName.trim()) || isGibberish(formData.ownerName)) {
      newErrors.ownerName = 'Enter a valid full name (letters only, no numbers or symbols).';
    }

    if (!PHONE_REGEX.test(phoneNormalized)) {
      newErrors.phone = 'Enter a valid Kenyan phone number, e.g. 0712345678 or +254712345678.';
    }

    const capacity = Number(formData.capacityLiters);
    if (
      formData.capacityLiters === '' ||
      Number.isNaN(capacity) ||
      !Number.isFinite(capacity) ||
      capacity <= 0 ||
      capacity > 1000000 ||
      !Number.isInteger(capacity)
    ) {
      newErrors.capacityLiters = 'Enter a realistic whole number of liters (1 - 1,000,000).';
    }

    if (!formData.estateCoverage || formData.estateCoverage.trim().length < 3) {
      newErrors.estateCoverage = 'Please select or add a valid estate.';
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must accept the compliance terms to continue.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Persist the vendor profile so the dashboard can read it.
    // In a real app this would come from your backend/auth session instead.
    localStorage.setItem('majiVendorProfile', JSON.stringify({
      businessName: formData.businessName,
      ownerName: formData.ownerName,
      phone: formData.phone,
      estateCoverage: formData.estateCoverage,
      capacityLiters: formData.capacityLiters
    }));

    // Simulate backend onboarding process response
    setIsSubmitted(true);
  };

  const goToDashboard = () => {
    // Adjust this path to match your actual route for the vendor dashboard
    navigate('/vendor/dashboard');
  };

  if (isSubmitted) {
    return (
      <div style={styles.centeredContainer}>
        <div style={styles.successCard}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ ...styles.formTitle, color: '#16a34a', margin: '0 0 0.5rem 0' }}>Application Received!</h2>
          <p style={{ color: '#475569', lineHeight: '1.5', margin: 0 }}>
            Thank you for registering <b>{formData.businessName}</b>. Our operational audit team will verify your setup parameters and text an activation token code to <b>{formData.phone}</b> within 24 hours.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button onClick={() => setIsSubmitted(false)} style={{ ...styles.submitBtn, backgroundColor: '#64748b', marginTop: 0 }}>
              Back to Form
            </button>
            <button onClick={goToDashboard} style={{ ...styles.submitBtn, marginTop: 0 }}>
              Go to Vendor Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.centeredContainer}>
      <div style={styles.formCard}>
        <header style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={styles.formTitle}>Join Maji Platform</h1>
          <p style={styles.formSubtitle}>Register your clean water station to begin receiving estate orders</p>
          <button
            type="button"
            onClick={goToDashboard}
            style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.85rem', cursor: 'pointer', marginTop: '0.5rem', textDecoration: 'underline' }}
          >
            Already registered? Go to your dashboard
          </button>
        </header>

        <form onSubmit={handleRegister} noValidate>
          <div style={styles.formGroup}>
            <label style={styles.label}>Business Entity / Station Name *</label>
            <input
              type="text"
              name="businessName"
              placeholder="e.g., AquaPure Springs Hub"
              value={formData.businessName}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.businessName && <p style={styles.errorText}>{errors.businessName}</p>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Contact Representative Full Name *</label>
            <input
              type="text"
              name="ownerName"
              placeholder="e.g., Sarah Ochieng"
              value={formData.ownerName}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.ownerName && <p style={styles.errorText}>{errors.ownerName}</p>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>M-Pesa Connected Phone Number *</label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g., 0712 345 678"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.phone && <p style={styles.errorText}>{errors.phone}</p>}
          </div>

          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Primary Target Estate</label>
              {!showAddEstate ? (
                <select
                  name="estateCoverage"
                  value={formData.estateCoverage}
                  onChange={handleEstateSelect}
                  style={styles.select}
                >
                  {estates.map(estate => (
                    <option key={estate} value={estate}>{estate}</option>
                  ))}
                  <option value={ADD_NEW_VALUE}>➕ Add new estate...</option>
                </select>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    autoFocus
                    placeholder="New estate name"
                    value={newEstateName}
                    onChange={(e) => setNewEstateName(e.target.value)}
                    style={styles.input}
                  />
                  <button type="button" onClick={handleAddEstate} style={{ ...styles.submitBtn, marginTop: 0, padding: '0 1rem', width: 'auto' }}>
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowAddEstate(false); setNewEstateName(''); }}
                    style={{ ...styles.submitBtn, marginTop: 0, padding: '0 1rem', width: 'auto', backgroundColor: '#64748b' }}
                  >
                    Cancel
                  </button>
                </div>
              )}
              {errors.estateCoverage && <p style={styles.errorText}>{errors.estateCoverage}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Daily Capacity (Liters) *</label>
              <input
                type="number"
                name="capacityLiters"
                placeholder="e.g., 2000"
                value={formData.capacityLiters}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.capacityLiters && <p style={styles.errorText}>{errors.capacityLiters}</p>}
            </div>
          </div>

          <div style={{ ...styles.formGroup, display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '1.25rem' }}>
            <input
              type="checkbox"
              id="agreedToTerms"
              name="agreedToTerms"
              checked={formData.agreedToTerms}
              onChange={handleChange}
              style={{ marginTop: '0.2rem' }}
            />
            <label htmlFor="agreedToTerms" style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.4', cursor: 'pointer' }}>
              I certify that our source water is fully treated, complies with health regulations, and agree to platform transaction policies.
            </label>
          </div>
          {errors.agreedToTerms && <p style={styles.errorText}>{errors.agreedToTerms}</p>}

          <button
            type="submit"
            disabled={!formData.agreedToTerms}
            style={{
              ...styles.submitBtn,
              opacity: formData.agreedToTerms ? 1 : 0.5,
              cursor: formData.agreedToTerms ? 'pointer' : 'not-allowed'
            }}
          >
            Submit Station Application
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  centeredContainer: { fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', boxSizing: 'border-box' },
  formCard: { backgroundColor: '#ffffff', width: '100%', maxWidth: '520px', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)', border: '1px solid #e2e8f0', boxSizing: 'border-box' },
  successCard: { backgroundColor: '#ffffff', width: '100%', maxWidth: '460px', padding: '2.5rem 2rem', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', border: '1px solid #e2e8f0', boxSizing: 'border-box' },
  formTitle: { margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' },
  formSubtitle: { margin: '0.4rem 0 0 0', fontSize: '0.9rem', color: '#64748b', lineHeight: '1.4' },
  formGroup: { marginBottom: '1.25rem', textAlign: 'left' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  label: { display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#475569', marginBottom: '0.4rem' },
  input: { width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', boxSizing: 'border-box', color: '#334155' },
  select: { width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', boxSizing: 'border-box', backgroundColor: '#ffffff', color: '#334155' },
  submitBtn: { width: '100%', padding: '0.85rem', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', marginTop: '1rem' },
  errorText: { color: '#dc2626', fontSize: '0.8rem', margin: '0.35rem 0 0 0' }
};

export default VendorRegister;