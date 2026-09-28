import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building, 
  UserCheck, 
  Briefcase, 
  FileCode, 
  Handshake, 
  FileText, 
  Sparkles, 
  ArrowRight,
  Search,
  CheckCircle2
} from 'lucide-react';

const ICON_MAP = {
  ShieldCheck: <ShieldCheck size={26} color="#3B82F6" />,
  Building: <Building size={26} color="#3B82F6" />,
  UserCheck: <UserCheck size={26} color="#3B82F6" />,
  Briefcase: <Briefcase size={26} color="#3B82F6" />,
  FileCode: <FileCode size={26} color="#3B82F6" />,
  Handshake: <Handshake size={26} color="#3B82F6" />,
  FileText: <FileText size={26} color="#3B82F6" />
};

export default function TemplateLibrary({ templates, onUseTemplate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filteredTemplates = templates.filter(tmpl => {
    const matchesSearch = tmpl.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tmpl.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tmpl.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || tmpl.category.toUpperCase() === selectedCategory.toUpperCase();
    return matchesSearch && matchesCat;
  });

  const categories = ['ALL', 'Confidentiality', 'Real Estate', 'HR & Hiring', 'Contracting', 'SaaS & Cloud', 'Corporate', 'General'];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
          <Sparkles size={14} /> Legal Library
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF' }}>
          Standard Legal Templates
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '1rem', marginTop: '0.25rem', maxWidth: '650px', margin: '0 auto' }}>
          Select from our library of battle-tested legal contract templates. Click "Use Template" to auto-populate the generator.
        </p>
      </div>

      {/* Filter & Search Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn-secondary ${selectedCategory === cat ? 'active-cat' : ''}`}
              style={{
                padding: '0.4rem 0.85rem',
                fontSize: '0.8rem',
                borderRadius: '999px',
                background: selectedCategory === cat ? '#2563EB' : 'rgba(255, 255, 255, 0.06)',
                color: selectedCategory === cat ? '#FFFFFF' : '#CBD5E1',
                borderColor: selectedCategory === cat ? '#2563EB' : 'rgba(255, 255, 255, 0.1)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.25rem', padding: '0.5rem 0.75rem 0.5rem 2.25rem', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredTemplates.map((tmpl) => (
          <div 
            key={tmpl.id} 
            className="glass-panel"
            style={{
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.25rem',
              transition: 'all 0.2s ease',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{
                  padding: '0.6rem',
                  borderRadius: '12px',
                  background: 'rgba(59, 130, 246, 0.12)',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                  {ICON_MAP[tmpl.icon_name] || <FileText size={26} color="#3B82F6" />}
                </div>
                <span className="badge badge-finalized">
                  {tmpl.category}
                </span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>
                {tmpl.title}
              </h3>

              <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.5, marginBottom: '1rem' }}>
                {tmpl.description}
              </p>

              <div style={{
                background: 'rgba(15, 23, 42, 0.5)',
                padding: '0.75rem',
                borderRadius: '8px',
                fontSize: '0.78rem',
                color: '#CBD5E1',
                lineHeight: 1.4,
                marginBottom: '0.5rem'
              }}>
                <strong>Example Terms:</strong><br />
                <span style={{ color: '#94A3B8' }}>{tmpl.terms_example}</span>
              </div>
            </div>

            <button 
              className="btn-primary"
              onClick={() => onUseTemplate(tmpl)}
              style={{ width: '100%', justifyContent: 'center', padding: '0.65rem 1rem', fontSize: '0.9rem' }}
            >
              Use Template <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
