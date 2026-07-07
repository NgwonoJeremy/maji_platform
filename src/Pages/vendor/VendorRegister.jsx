import React, { useState } from 'react';

const VendorRegister = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    estateCoverage: 'Greenwood Estates',
    capacityLiters: '',
    agreedToTerms: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.businessName || !formData.phone || !formData.capacityLiters) {
      alert("Please fill out all required setup parameters.");
      return;
    }
    if (!formData.agreedToTerms) {
      alert("Please review and accept the system compliance standard terms.");
      return;
    }

    // Simulate backend onboarding process response
    setIsSubmitted(true);
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
          <button onClick={() => setIsSubmitted(false)} style={{ ...styles.submitBtn, marginTop: '1.5rem', backgroundColor: '#64748b' }}>
            Back to Form
          </button>
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
        </header>

        <form onSubmit={handleRegister}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Business Entity / Station Name *</label>
            <input 
              type="text" 
              name="businessName"
              placeholder="e.g., AquaPure Springs Hub"
              value={formData.businessName}
              onChange={handleChange}
              style={styles.input}
              required
            />
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
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>M-Pesa Connected Phone Number *</label>
            <input 
              type="tel" 
              name="phone"
              placeholder="e.g., +254 712 345 678"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Primary Target Estate</label>
              <select 
                name="estateCoverage" 
                value={formData.estateCoverage}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="Greenwood Estates">Greenwood Estates</option>
                <option value="Kilimani Heights">Kilimani Heights</option>
                <option value="South C Enclave">South C Enclave</option>
              </select>
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
                required
              />
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

          <button type="submit" style={styles.submitBtn}>
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
  submitBtn: { width: '100%', padding: '0.85rem', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', marginTop: '1rem' }
};

export default VendorRegister;