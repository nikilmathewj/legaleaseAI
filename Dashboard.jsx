import React, { useState } from 'react';
import { 
  PlusCircle, 
  FileText, 
  Download, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter, 
  LayoutDashboard, 
  Library, 
  Settings, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  FileCheck,
  ChevronDown
} from 'lucide-react';

export default function Dashboard({ 
  documents, 
  onCreateNew, 
  onViewDoc, 
  onEditDoc, 
  onDeleteDoc, 
  onExportDoc, 
  onSelectTab 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [activeSidebar, setActiveSidebar] = useState('dashboard');
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(null);

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.parties.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.document_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'ALL' || doc.document_type.toUpperCase() === filterType;
    return matchesSearch && matchesFilter;
  });

  const activeCount = documents.filter(d => d.status === 'Active' || d.status === 'Finalized').length;
  const draftCount = documents.filter(d => d.status === 'Draft').length;

  return (
    <div style={{
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '2rem 1.5rem',
      display: 'grid',
      gridTemplateColumns: '240px 1fr',
      gap: '2rem'
    }}>
      
      {/* 1. Sidebar Navigation */}
      <aside className="glass-panel" style={{ padding: '1.5rem', height: 'fit-content' }}>
        <div style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: '#64748B',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '1rem'
        }}>
          Navigation
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
            { id: 'create', label: 'Create Document', icon: <PlusCircle size={18} />, action: onCreateNew },
            { id: 'my_docs', label: 'My Documents', icon: <FileText size={18} /> },
            { id: 'templates', label: 'Templates', icon: <Library size={18} />, action: () => onSelectTab('templates') },
            { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSidebar(item.id);
                if (item.action) item.action();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: activeSidebar === item.id ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
                color: activeSidebar === item.id ? '#60A5FA' : '#CBD5E1',
                fontWeight: activeSidebar === item.id ? 600 : 400,
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{
          marginTop: '2.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '0.5rem' }}>
            Account Status
          </div>
          <div style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}>
            <ShieldCheck size={16} /> Pro Enterprise Active
          </div>
        </div>
      </aside>

      {/* 2. Main Dashboard Content */}
      <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Welcome Header & CTA */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF' }}>
              Welcome back, Counsel
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>
              Manage your legal repository and generate AI contracts with full security.
            </p>
          </div>

          <button className="btn-primary" onClick={onCreateNew}>
            <PlusCircle size={18} /> Create New Document
          </button>
        </div>

        {/* Metrics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem'
        }}>
          {[
            { label: 'Total Documents', val: documents.length, icon: <FileText size={22} color="#3B82F6" />, bg: 'rgba(59, 130, 246, 0.1)' },
            { label: 'Active / Finalized', val: activeCount, icon: <CheckCircle2 size={22} color="#10B981" />, bg: 'rgba(16, 185, 129, 0.1)' },
            { label: 'Draft Contracts', val: draftCount, icon: <Clock size={22} color="#F59E0B" />, bg: 'rgba(245, 158, 11, 0.1)' },
            { label: 'Exported Files', val: documents.length * 2, icon: <FileCheck size={22} color="#8B5CF6" />, bg: 'rgba(139, 92, 246, 0.1)' }
          ].map((stat, i) => (
            <div key={i} className="glass-panel" style={{ padding: '1.25rem 1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 600 }}>{stat.label}</span>
                <div style={{ padding: '0.4rem', borderRadius: '8px', background: stat.bg }}>
                  {stat.icon}
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF' }}>
                {stat.val}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Documents Table Container */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          
          {/* Table Toolbar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF' }}>
              Recent Documents
            </h2>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {/* Search Bar */}
              <div style={{ position: 'relative' }}>
                <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.25rem', width: '220px', padding: '0.5rem 0.75rem 0.5rem 2.25rem', fontSize: '0.85rem' }}
                />
              </div>

              {/* Document Type Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="form-select"
                style={{ width: '160px', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
              >
                <option value="ALL">All Types</option>
                <option value="NDA">NDA</option>
                <option value="AGREEMENT">Agreement</option>
                <option value="CONTRACT">Contract</option>
                <option value="LEASE AGREEMENT">Lease Agreement</option>
                <option value="EMPLOYMENT OFFER LETTER">Offer Letter</option>
              </select>
            </div>
          </div>

          {/* Table View */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94A3B8', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Document Title</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Type</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Parties</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Created Date</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>
                      No documents found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredDocs.map((doc) => (
                    <tr 
                      key={doc.id}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        transition: 'background 0.2s'
                      }}
                    >
                      <td style={{ padding: '1rem', fontWeight: 600, color: '#FFFFFF' }}>
                        {doc.title}
                      </td>
                      <td style={{ padding: '1rem', color: '#94A3B8' }}>
                        {doc.document_type}
                      </td>
                      <td style={{ padding: '1rem', color: '#CBD5E1', maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {doc.parties}
                      </td>
                      <td style={{ padding: '1rem', color: '#94A3B8', fontSize: '0.85rem' }}>
                        {doc.effective_date || doc.created_at}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span className={`badge badge-${doc.status.toLowerCase()}`}>
                          {doc.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end', position: 'relative' }}>
                          
                          {/* View Preview */}
                          <button
                            onClick={() => onViewDoc(doc)}
                            title="Preview Document"
                            style={{
                              background: 'rgba(59, 130, 246, 0.15)',
                              border: 'none',
                              color: '#60A5FA',
                              padding: '0.45rem',
                              borderRadius: '6px',
                              cursor: 'pointer'
                            }}
                          >
                            <Eye size={16} />
                          </button>

                          {/* Edit */}
                          <button
                            onClick={() => onEditDoc(doc)}
                            title="Edit Document"
                            style={{
                              background: 'rgba(255, 255, 255, 0.08)',
                              border: 'none',
                              color: '#E2E8F0',
                              padding: '0.45rem',
                              borderRadius: '6px',
                              cursor: 'pointer'
                            }}
                          >
                            <Edit size={16} />
                          </button>

                          {/* Export Dropdown Toggle */}
                          <div style={{ position: 'relative' }}>
                            <button
                              onClick={() => setDownloadDropdownOpen(downloadDropdownOpen === doc.id ? null : doc.id)}
                              title="Export Options"
                              style={{
                                background: 'rgba(16, 185, 129, 0.15)',
                                border: 'none',
                                color: '#10B981',
                                padding: '0.45rem 0.6rem',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.2rem'
                              }}
                            >
                              <Download size={16} /> <ChevronDown size={12} />
                            </button>

                            {downloadDropdownOpen === doc.id && (
                              <div className="glass-panel" style={{
                                position: 'absolute',
                                right: 0,
                                top: '110%',
                                zIndex: 50,
                                width: '150px',
                                padding: '0.5rem',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                                background: '#1C2541'
                              }}>
                                <button
                                  onClick={() => { onExportDoc('TXT', doc); setDownloadDropdownOpen(null); }}
                                  style={{ width: '100%', padding: '0.4rem 0.6rem', textAlign: 'left', background: 'transparent', border: 'none', color: '#E2E8F0', cursor: 'pointer', fontSize: '0.85rem' }}
                                >
                                  Download TXT
                                </button>
                                <button
                                  onClick={() => { onExportDoc('DOCX', doc); setDownloadDropdownOpen(null); }}
                                  style={{ width: '100%', padding: '0.4rem 0.6rem', textAlign: 'left', background: 'transparent', border: 'none', color: '#E2E8F0', cursor: 'pointer', fontSize: '0.85rem' }}
                                >
                                  Download DOCX
                                </button>
                                <button
                                  onClick={() => { onExportDoc('PDF', doc); setDownloadDropdownOpen(null); }}
                                  style={{ width: '100%', padding: '0.4rem 0.6rem', textAlign: 'left', background: 'transparent', border: 'none', color: '#E2E8F0', cursor: 'pointer', fontSize: '0.85rem' }}
                                >
                                  Download PDF
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Delete */}
                          <button
                            onClick={() => onDeleteDoc(doc.id)}
                            title="Delete Document"
                            style={{
                              background: 'rgba(239, 68, 68, 0.15)',
                              border: 'none',
                              color: '#EF4444',
                              padding: '0.45rem',
                              borderRadius: '6px',
                              cursor: 'pointer'
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
