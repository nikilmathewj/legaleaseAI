import React from 'react';
import { Scale, FileText, LayoutDashboard, Library, PlusCircle, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, backendOnline }) {
  return (
    <nav className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderRadius: 0,
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      padding: '0.9rem 2rem'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('landing')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer'
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)',
            padding: '0.6rem',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
          }}>
            <Scale size={24} color="#FFFFFF" />
          </div>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
              Legal<span style={{ color: '#3B82F6' }}>Ease</span>
            </span>
            <span style={{
              display: 'block',
              fontSize: '0.65rem',
              color: '#94A3B8',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginTop: '-2px'
            }}>
              AI Legal Document Platform
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('landing')}
            className={`btn-secondary ${activeTab === 'landing' ? 'active-nav' : ''}`}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              background: activeTab === 'landing' ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
              borderColor: activeTab === 'landing' ? '#3B82F6' : 'transparent'
            }}
          >
            Home
          </button>
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`btn-secondary ${activeTab === 'dashboard' ? 'active-nav' : ''}`}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              background: activeTab === 'dashboard' ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
              borderColor: activeTab === 'dashboard' ? '#3B82F6' : 'transparent'
            }}
          >
            <LayoutDashboard size={16} /> Dashboard
          </button>

          <button
            onClick={() => setActiveTab('generator')}
            className={`btn-secondary ${activeTab === 'generator' ? 'active-nav' : ''}`}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              background: activeTab === 'generator' ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
              borderColor: activeTab === 'generator' ? '#3B82F6' : 'transparent'
            }}
          >
            <FileText size={16} /> Generator
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`btn-secondary ${activeTab === 'templates' ? 'active-nav' : ''}`}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              background: activeTab === 'templates' ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
              borderColor: activeTab === 'templates' ? '#3B82F6' : 'transparent'
            }}
          >
            <Library size={16} /> Templates
          </button>
        </div>

        {/* Right CTA & Status Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            fontSize: '0.75rem',
            padding: '0.3rem 0.75rem',
            borderRadius: '999px',
            background: backendOnline ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
            color: backendOnline ? '#10B981' : '#F59E0B',
            border: `1px solid ${backendOnline ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontWeight: 600
          }}>
            {backendOnline ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
            {backendOnline ? 'AI Backend Ready' : 'AI Offline (Fallback Mode)'}
          </div>

          <button 
            className="btn-primary"
            onClick={() => setActiveTab('generator')}
            style={{ padding: '0.55rem 1.25rem', fontSize: '0.9rem' }}
          >
            <PlusCircle size={16} /> Create Document
          </button>
        </div>
      </div>
    </nav>
  );
}
