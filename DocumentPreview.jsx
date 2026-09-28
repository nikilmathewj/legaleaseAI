import React from 'react';
import { 
  Download, 
  Edit3, 
  ArrowLeft, 
  FileText, 
  Printer, 
  ShieldCheck, 
  Calendar,
  CheckCircle2
} from 'lucide-react';

export default function DocumentPreview({ 
  documentData, 
  onEdit, 
  onExport, 
  onBack 
}) {
  if (!documentData) return null;

  const { title, document_type, parties, terms, effective_date, content, font_family, logo_base64 } = documentData;

  // Split terms into list for structured rendering
  const termsList = terms ? terms.split(';').map(t => t.trim()).filter(Boolean) : [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      
      {/* Action Toolbar */}
      <div className="glass-panel" style={{
        padding: '1rem 1.5rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <button className="btn-secondary" onClick={onBack} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            className="btn-outline" 
            onClick={onEdit}
            style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60A5FA', borderColor: '#3B82F6' }}
          >
            <Edit3 size={16} /> Edit Document
          </button>

          <button className="btn-secondary" onClick={handlePrint} style={{ padding: '0.5rem 0.9rem' }}>
            <Printer size={16} /> Print
          </button>

          {/* Direct Download Buttons */}
          <button className="btn-secondary" onClick={() => onExport('TXT', documentData)} style={{ borderColor: '#64748B' }}>
            <Download size={15} /> TXT
          </button>

          <button className="btn-secondary" onClick={() => onExport('DOCX', documentData)} style={{ borderColor: '#3B82F6', color: '#60A5FA' }}>
            <Download size={15} /> DOCX
          </button>

          <button className="btn-primary" onClick={() => onExport('PDF', documentData)}>
            <Download size={16} /> PDF
          </button>
        </div>
      </div>

      {/* Official Legal Paper Card */}
      <div className="paper-document" style={{ fontFamily: font_family || 'Times New Roman' }}>
        
        {/* Company Logo Header */}
        {logo_base64 && (
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <img src={logo_base64} alt="Company Logo" style={{ maxHeight: '75px', maxWidth: '240px' }} />
          </div>
        )}

        {/* Title */}
        <h1 className="paper-title">
          {title}
        </h1>

        {/* Header Summary Metadata Box */}
        <div className="paper-header-box">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <strong>DOCUMENT TYPE:</strong> {document_type}<br />
              <strong>EFFECTIVE DATE:</strong> {effective_date}
            </div>
            <div>
              <strong>PARTIES INVOLVED:</strong><br />
              <span style={{ color: '#334155' }}>{parties}</span>
            </div>
          </div>
        </div>

        {/* Main Document Content Body */}
        <div style={{ fontSize: '1.02rem', whiteSpace: 'pre-wrap', lineHeight: 1.75 }}>
          {content.split('\n').map((line, idx) => {
            const trimmed = line.trim();
            if (!trimmed) return <div key={idx} style={{ height: '0.8rem' }} />;

            // Check section headers
            if (/^(1\.|2\.|3\.|4\.|5\.|6\.|7\.|8\.|RECITALS:|PARTIES:|DEFINITIONS|GOVERNING LAW|IN WITNESS WHEREOF)/.test(trimmed)) {
              return (
                <div key={idx} className="paper-section-title">
                  {trimmed}
                </div>
              );
            }

            return (
              <p key={idx} className="paper-paragraph">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Terms Breakdown Table if present */}
        {termsList.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <div className="paper-section-title">
              KEY STIPULATED TERMS & CLAUSES SUMMARY
            </div>
            <table className="paper-terms-table">
              <thead>
                <tr>
                  <th style={{ width: '20%' }}>Clause #</th>
                  <th>Stipulated Terms & Requirement</th>
                </tr>
              </thead>
              <tbody>
                {termsList.map((termItem, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, color: '#1E3A8A' }}>Clause {i + 1}</td>
                    <td>{termItem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Stamp Watermark graphic */}
        <div style={{
          marginTop: '3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingTop: '2rem',
          borderTop: '1px solid #E2E8F0',
          fontFamily: 'Inter, sans-serif'
        }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
            LegalEase AI Serial: <code>LEG-EASE-{documentData.id || '2026-X'}</code><br />
            Generated on: {new Date().toLocaleDateString()} | Verified Platform Standard
          </div>
          
          <div style={{
            border: '2px double #1E3A8A',
            padding: '0.4rem 0.8rem',
            borderRadius: '4px',
            color: '#1E3A8A',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            OFFICIAL LEGAL DRAFT
          </div>
        </div>
      </div>
    </div>
  );
}
