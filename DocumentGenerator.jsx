import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  FileCode, 
  Upload, 
  Type, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  Building,
  Briefcase,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function DocumentGenerator({ onGenerate, isGenerating, prefillData }) {
  const [documentType, setDocumentType] = useState(prefillData?.type || 'NDA');
  const [parties, setParties] = useState(prefillData?.parties || 'Jane Doe (Service Provider), TechNova Inc. (Client)');
  const [terms, setTerms] = useState(
    prefillData?.terms || 
    'Payment to be made within 30 days of invoice; Confidentiality must be maintained for 2 years; Either party may terminate with 15 days written notice.'
  );
  const [effectiveDate, setEffectiveDate] = useState(
    prefillData?.effective_date || new Date().toISOString().split('T')[0]
  );
  const [fontFamily, setFontFamily] = useState('Times New Roman');
  const [logoBase64, setLogoBase64] = useState(null);
  const [logoFileName, setLogoFileName] = useState('');

  // Logo uploader handler
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset Auto-Fill Helpers
  const fillSampleNDA = () => {
    setDocumentType('NDA');
    setParties('Quantum Innovations Inc. (Disclosing Party), CyberTech Solutions LLC (Receiving Party)');
    setTerms('Confidential Information valid for 3 years; All technical schematics strictly protected; Disputes resolved in Delaware state court; Permitted disclosures only to key executives.');
    setEffectiveDate('2026-09-24');
  };

  const fillSampleLease = () => {
    setDocumentType('Lease Agreement');
    setParties('Apex Commercial Real Estate Corp (Landlord), Studio Creative LLC (Tenant)');
    setTerms('Monthly rent of $3,500 due on 1st of each month; Security deposit $7,000; Lease duration 12 months starting Oct 1 2026; No structural alterations without written permission.');
    setEffectiveDate('2026-10-01');
  };

  const fillSampleOfferLetter = () => {
    setDocumentType('Employment Offer Letter');
    setParties('LegalEase AI Technologies Inc. (Employer), Alex Morgan (Employee)');
    setTerms('Annual base salary of $145,000 paid bi-weekly; Executive equity grant of 15,000 options; Standard health benefits included; Employment is at-will.');
    setEffectiveDate('2026-10-15');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!parties.trim() || !terms.trim()) {
      alert("Please enter both involved parties and key terms.");
      return;
    }

    onGenerate({
      document_type: documentType,
      parties: parties,
      terms: terms,
      effective_date: effectiveDate,
      font_family: fontFamily,
      logo_base64: logoBase64
    });
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 1rem',
          borderRadius: '999px',
          background: 'rgba(59, 130, 246, 0.12)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          color: '#60A5FA',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '0.75rem'
        }}>
          <Sparkles size={14} /> AI Contract Builder
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF' }}>
          Create a New Legal Document
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '1rem', marginTop: '0.25rem' }}>
          Fill in the party details and terms below. Our AI engine will structure a formal legal draft.
        </p>
      </div>

      {/* Quick Sample Presets */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>
          <Zap size={16} color="#F59E0B" /> Quick Sample Presets:
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button type="button" onClick={fillSampleNDA} className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
            <ShieldCheck size={14} /> Sample NDA
          </button>
          <button type="button" onClick={fillSampleLease} className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
            <Building size={14} /> Sample Lease
          </button>
          <button type="button" onClick={fillSampleOfferLetter} className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
            <Briefcase size={14} /> Sample Offer Letter
          </button>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '2.5rem' }}>
        
        {/* 1. Document Type */}
        <div className="form-group">
          <label className="form-label">
            <span>1. Document Type</span>
            <span style={{ fontSize: '0.75rem', color: '#60A5FA', fontWeight: 500 }}>Select standard template</span>
          </label>
          <select 
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="form-select"
          >
            <option value="Agreement">Agreement</option>
            <option value="Contract">Contract</option>
            <option value="NDA">NDA (Non-Disclosure Agreement)</option>
            <option value="Lease Agreement">Lease Agreement</option>
            <option value="Employment Offer Letter">Employment Offer Letter</option>
            <option value="Freelance Work Contract">Freelance Work Contract</option>
            <option value="Other">Other / General Purpose</option>
          </select>
        </div>

        {/* 2. Parties Involved */}
        <div className="form-group">
          <label className="form-label">
            <span>2. Parties Involved</span>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Full Legal Names & Roles</span>
          </label>
          <textarea
            rows="3"
            value={parties}
            onChange={(e) => setParties(e.target.value)}
            className="form-textarea"
            placeholder="Example: Jane Doe (Service Provider), TechNova Inc. (Client)"
            required
          />
          <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Info size={12} /> Example format: Jane Doe (Service Provider), TechNova Inc. (Client)
          </span>
        </div>

        {/* 3. Terms & Conditions */}
        <div className="form-group">
          <label className="form-label">
            <span>3. Terms & Conditions</span>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Separate clauses with semicolons (;)</span>
          </label>
          <textarea
            rows="5"
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            className="form-textarea"
            placeholder="Payment to be made within 30 days of invoice; Confidentiality must be maintained; Either party may terminate with 15 days notice."
            required
          />
          <div style={{
            background: 'rgba(15, 23, 42, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            color: '#CBD5E1',
            lineHeight: 1.5
          }}>
            <strong>Pro Tip:</strong> Enter key stipulations separated by semicolons (;). For example:<br />
            <em>"Payment within 30 days; Confidentiality kept for 2 years; Governing law in Delaware."</em>
          </div>
        </div>

        {/* 4. Effective Date */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.25rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">
              <span>4. Effective Date</span>
            </label>
            <input
              type="date"
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">
              <span>5. Preferred Legal Typography</span>
            </label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="form-select"
            >
              <option value="Times New Roman">Times New Roman (Formal Legal Standard)</option>
              <option value="Georgia">Georgia (Classic Legal Serif)</option>
              <option value="Garamond">Garamond (Executive Serif)</option>
              <option value="Arial">Arial (Modern Clean Sans)</option>
            </select>
          </div>
        </div>

        {/* 5. Optional Branding Logo Upload */}
        <div className="form-group">
          <label className="form-label">
            <span>6. Optional Branding Logo</span>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>PNG/JPG Letterhead Logo</span>
          </label>
          <div style={{
            border: '2px dashed rgba(255, 255, 255, 0.15)',
            borderRadius: '10px',
            padding: '1.25rem',
            textAlign: 'center',
            background: 'rgba(15, 23, 42, 0.4)',
            cursor: 'pointer',
            position: 'relative'
          }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer'
              }}
            />
            {logoBase64 ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <img src={logoBase64} alt="Company Logo Preview" style={{ maxHeight: '45px', borderRadius: '4px' }} />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#10B981' }}>Logo Attached</div>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{logoFileName}</div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', color: '#94A3B8', fontSize: '0.85rem' }}>
                <Upload size={22} color="#3B82F6" />
                <span>Click or drag image to attach company logo to document letterhead</span>
              </div>
            )}
          </div>
        </div>

        {/* Generate Button */}
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button 
            type="submit"
            className="btn-primary" 
            disabled={isGenerating}
            style={{ 
              width: '100%', 
              justifyContent: 'center', 
              padding: '1rem', 
              fontSize: '1.1rem',
              opacity: isGenerating ? 0.7 : 1
            }}
          >
            {isGenerating ? (
              <>
                <span className="spinner" style={{
                  width: '20px',
                  height: '20px',
                  border: '3px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#FFFFFF',
                  borderRadius: '50%',
                  display: 'inline-block',
                  animation: 'spin 1s linear infinite'
                }} />
                Drafting Structured Legal Document with AI...
              </>
            ) : (
              <>
                <Sparkles size={20} /> Generate Document
              </>
            )}
          </button>
        </div>
      </form>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
