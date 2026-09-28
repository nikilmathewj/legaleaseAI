import React from 'react';
import { 
  Sparkles, 
  Edit3, 
  FileCheck, 
  ShieldAlert, 
  Download, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Scale,
  Lock,
  Layers,
  HelpCircle,
  Building,
  Briefcase,
  UserCheck
} from 'lucide-react';

export default function LandingPage({ onGetStarted, onUseTemplate }) {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const featureCards = [
    {
      icon: <Sparkles size={24} color="#3B82F6" />,
      title: "AI-Powered Generation",
      description: "Generate comprehensive, structured contracts, NDAs, and agreements in seconds powered by advanced legal intelligence."
    },
    {
      icon: <Edit3 size={24} color="#3B82F6" />,
      title: "Editable Documents",
      description: "In-app WYSIWYG editor allows you to refine clauses, insert custom terms, and update party details before finalizing."
    },
    {
      icon: <FileCheck size={24} color="#3B82F6" />,
      title: "Professional Formatting",
      description: "Formal legal typography, letterheads, numbered clauses, terms breakdown tables, and dual-signature execution blocks."
    },
    {
      icon: <Lock size={24} color="#3B82F6" />,
      title: "Secure Data Handling",
      description: "Bank-grade client data protection. Inputs are sanitized and credentials remain isolated in secure server environments."
    },
    {
      icon: <Download size={24} color="#3B82F6" />,
      title: "Multiple Export Formats",
      description: "Export instantly to crisp PDF, editable Microsoft Word (DOCX), or plain text (TXT) formats with one click."
    },
    {
      icon: <Zap size={24} color="#3B82F6" />,
      title: "Easy-to-Use Interface",
      description: "No legal background needed. Simply select a document type, enter parties & terms, and let LegalEase draft the rest."
    }
  ];

  const sampleDocs = [
    { type: "NDA", name: "Non-Disclosure Agreement", icon: <Lock size={18} /> },
    { type: "Lease Agreement", name: "Residential & Commercial Lease", icon: <Building size={18} /> },
    { type: "Employment Offer Letter", name: "Executive Hiring Contract", icon: <UserCheck size={18} /> },
    { type: "Freelance Work Contract", name: "Services & Retainer Agreement", icon: <Briefcase size={18} /> }
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      
      {/* 1. Hero Section */}
      <section style={{
        textAlign: 'center',
        padding: '4rem 1rem 3rem 1rem',
        position: 'relative'
      }}>
        {/* Glow effect background */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(11, 19, 43, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '999px',
            background: 'rgba(59, 130, 246, 0.12)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: '#60A5FA',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}>
            <Sparkles size={14} /> Next-Gen AI Legal Technology
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #94A3B8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Create Professional Legal Documents <br />
            <span style={{
              background: 'linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              with Artificial Intelligence
            </span>
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: '#94A3B8',
            maxWidth: '750px',
            margin: '0 auto 2.5rem auto',
            fontWeight: 400
          }}>
            Generate structured, legally sound contracts, agreements, NDAs, and offer letters in seconds.
            Tailored to your exact terms — no legal background or manual drafting required.
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <button 
              className="btn-primary" 
              onClick={onGetStarted}
              style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}
            >
              Create a Document <ArrowRight size={18} />
            </button>
            <button 
              className="btn-secondary" 
              onClick={scrollToHowItWorks}
              style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}
            >
              <HelpCircle size={18} /> How It Works
            </button>
          </div>

          {/* Supported Types Badges */}
          <div style={{
            marginTop: '3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            {sampleDocs.map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#CBD5E1',
                fontSize: '0.85rem'
              }}>
                <span style={{ color: '#3B82F6' }}>{item.icon}</span>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Feature Cards Grid */}
      <section style={{ padding: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>
            Built for Businesses, Freelancers & Professionals
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem' }}>
            Everything you need to create, preview, edit, and export legal contracts seamlessly.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem'
        }}>
          {featureCards.map((feat, idx) => (
            <div 
              key={idx} 
              className="glass-panel"
              style={{
                padding: '2rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              <div style={{
                background: 'rgba(59, 130, 246, 0.1)',
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}>
                {feat.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF' }}>
                {feat.title}
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section id="how-it-works" style={{
        padding: '4rem 2rem',
        background: 'rgba(28, 37, 65, 0.5)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        margin: '2rem 0'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ color: '#3B82F6', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Simple 4-Step Process
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#FFFFFF', marginTop: '0.25rem' }}>
            How LegalEase Works
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2rem'
        }}>
          {[
            { step: "01", title: "Select Document", desc: "Choose from NDAs, Contracts, Leases, Offer Letters, or custom agreements." },
            { step: "02", title: "Enter Parties & Terms", desc: "Provide party details and key clauses separated by semicolons." },
            { step: "03", title: "Generate & Preview", desc: "Our AI constructs a complete structured document with formal sections." },
            { step: "04", title: "Edit & Download", desc: "Make any manual edits, then export instantly to TXT, DOCX, or PDF." }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '1.75rem',
              borderRadius: '16px',
              position: 'relative'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: '#3B82F6',
                marginBottom: '1rem',
                opacity: 0.8
              }}>
                {item.step}
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>
                {item.title}
              </h4>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Disclaimer Banner */}
      <div style={{
        background: 'rgba(245, 158, 11, 0.08)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        borderRadius: '12px',
        padding: '1.25rem 1.75rem',
        marginTop: '3rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem'
      }}>
        <ShieldAlert size={24} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FCD34D', marginBottom: '0.25rem' }}>
            Legal Disclaimer & Terms of Use
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#CBD5E1', lineHeight: 1.5 }}>
            LegalEase provides AI-generated legal documents and informational templates intended as drafting aids. 
            LegalEase is not a law firm and does not provide formal legal advice. Users are advised to review all generated documents 
            with qualified legal counsel before official execution or relying upon them for court filings.
          </p>
        </div>
      </div>

      {/* 5. Footer */}
      <footer style={{
        marginTop: '4rem',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        color: '#64748B',
        fontSize: '0.85rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Scale size={18} color="#3B82F6" />
          <span style={{ fontWeight: 700, color: '#94A3B8' }}>LegalEase AI</span> — Professional Document Generation Platform
        </div>
        <div>
          &copy; {new Date().getFullYear()} LegalEase. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
