import React, { useState } from 'react';
import { 
  Save, 
  X, 
  RefreshCw, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  FileText,
  Type
} from 'lucide-react';

export default function DocumentEditor({ 
  documentData, 
  onSave, 
  onCancel, 
  onRegenerate 
}) {
  const [editedTitle, setEditedTitle] = useState(documentData?.title || '');
  const [editedContent, setEditedContent] = useState(documentData?.content || '');
  const [editedParties, setEditedParties] = useState(documentData?.parties || '');
  const [editedTerms, setEditedTerms] = useState(documentData?.terms || '');

  const handleSave = () => {
    onSave({
      ...documentData,
      title: editedTitle,
      content: editedContent,
      parties: editedParties,
      terms: editedTerms
    });
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear the editor content?")) {
      setEditedContent('');
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      
      {/* Editor Header Bar */}
      <div className="glass-panel" style={{
        padding: '1.25rem 1.75rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FileText size={22} color="#3B82F6" />
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF' }}>
              Edit Legal Document
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
              Modify title, recitals, clauses, and terms. Changes will reflect in exports.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={onCancel}>
            <X size={16} /> Cancel
          </button>
          
          <button className="btn-secondary" onClick={handleClear} style={{ color: '#F59E0B', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
            <Trash2 size={16} /> Clear
          </button>

          <button className="btn-secondary" onClick={() => onRegenerate(documentData)} style={{ color: '#60A5FA', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
            <RefreshCw size={16} /> Regenerate
          </button>

          <button className="btn-primary" onClick={handleSave}>
            <Save size={16} /> Save Changes
          </button>
        </div>
      </div>

      {/* Editor Form Panel */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        
        {/* Title Edit */}
        <div className="form-group">
          <label className="form-label">
            <span>Document Title</span>
          </label>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="form-input"
            style={{ fontWeight: 600, fontSize: '1.05rem' }}
          />
        </div>

        {/* Parties Edit */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Parties Summary</label>
            <input
              type="text"
              value={editedParties}
              onChange={(e) => setEditedParties(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Terms Semicolon Summary</label>
            <input
              type="text"
              value={editedTerms}
              onChange={(e) => setEditedTerms(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        {/* Main Document Content Editor */}
        <div className="form-group" style={{ marginTop: '1rem' }}>
          <label className="form-label">
            <span>Full Document Text Content</span>
            <span style={{ fontSize: '0.75rem', color: '#60A5FA' }}>Line breaks and formatting preserved</span>
          </label>
          <textarea
            rows="22"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="form-textarea"
            style={{
              fontFamily: 'Courier New, Courier, monospace',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              background: '#0B132B',
              color: '#F8FAFC',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '1.25rem'
            }}
          />
        </div>

        {/* Bottom Save Bar */}
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            <Save size={18} /> Save & Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
}
