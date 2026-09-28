import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import DocumentGenerator from './components/DocumentGenerator';
import DocumentPreview from './components/DocumentPreview';
import DocumentEditor from './components/DocumentEditor';
import TemplateLibrary from './components/TemplateLibrary';
import { 
  checkBackendStatus, 
  generateDocument, 
  fetchDocuments, 
  fetchTemplates, 
  updateDocument, 
  deleteDocument, 
  exportDocument 
} from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing'); // landing, dashboard, generator, preview, editor, templates
  const [backendOnline, setBackendOnline] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const [activeDoc, setActiveDoc] = useState(null);
  const [generatorPrefill, setGeneratorPrefill] = useState(null);

  // Initial load
  useEffect(() => {
    async function initData() {
      const isOnline = await checkBackendStatus();
      setBackendOnline(isOnline);

      const docs = await fetchDocuments();
      if (docs && docs.length > 0) {
        setDocuments(docs);
      } else {
        // Initial sample documents if offline or backend empty
        setDocuments([
          {
            id: 'doc_nda_01',
            title: 'MUTUAL NON-DISCLOSURE AGREEMENT',
            document_type: 'NDA',
            parties: 'TechNova Inc. (Client), Jane Doe (Service Provider)',
            terms: 'Confidentiality maintained for 3 years; IP rights belong to Client; 15 days termination notice.',
            effective_date: '2026-09-24',
            created_at: '2026-09-24 10:15',
            status: 'Active',
            content: `MUTUAL NON-DISCLOSURE AGREEMENT

THIS AGREEMENT is made effective September 24, 2026, by and between TechNova Inc. ("Client") and Jane Doe ("Service Provider").

RECITALS:
WHEREAS, the parties intend to engage in business discussions concerning proprietary AI technology; and
WHEREAS, both parties desire to safeguard confidential information disclosed during such discussions.

1. DEFINITIONS AND OBLIGATIONS
1.1 "Confidential Information" includes all non-public software code, business strategies, and client data.
1.2 Receiving Party agrees to maintain strict confidentiality for a period of three (3) years.

2. GOVERNING LAW
2.1 Governed by the laws of the State of Delaware.

IN WITNESS WHEREOF, the parties sign below.

___________________________          ___________________________
TechNova Inc.                        Jane Doe
Date: September 24, 2026             Date: September 24, 2026`
          }
        ]);
      }

      const tmpls = await fetchTemplates();
      if (tmpls && tmpls.length > 0) {
        setTemplates(tmpls);
      } else {
        // Fallback standard templates
        setTemplates([
          {
            id: 'tmpl_1',
            title: 'Mutual Non-Disclosure Agreement (NDA)',
            type: 'NDA',
            description: 'Comprehensive dual-party NDA to safeguard commercial, financial, and technical proprietary information.',
            category: 'Confidentiality',
            parties_example: 'TechNova Systems Inc., Quantum Innovations LLC',
            terms_example: 'Confidential Information valid for 3 years; Delaware arbitration.',
            icon_name: 'ShieldCheck'
          },
          {
            id: 'tmpl_2',
            title: 'Commercial & Residential Lease Agreement',
            type: 'Lease Agreement',
            description: 'Legally binding lease agreement specifying rent, security deposit, property maintenance, and tenant duties.',
            category: 'Real Estate',
            parties_example: 'Apex Commercial Real Estate (Landlord), Horizon Studio (Tenant)',
            terms_example: 'Monthly rent $4,500; Security deposit $9,000; 12 months duration.',
            icon_name: 'Building'
          },
          {
            id: 'tmpl_3',
            title: 'Executive Employment Offer Letter',
            type: 'Employment Offer Letter',
            description: 'Formal offer letter detailing base compensation, equity options, benefits package, and employment start date.',
            category: 'HR & Hiring',
            parties_example: 'LegalEase Corp (Employer), Alex Vance (Employee)',
            terms_example: 'Annual salary $165,000; 20,000 stock options; At-will terms.',
            icon_name: 'UserCheck'
          }
        ]);
      }
    }

    initData();
  }, []);

  // Handle Document Generation
  const handleGenerate = async (formData) => {
    setIsGenerating(true);
    try {
      const res = await generateDocument(formData);
      if (res && res.success) {
        const generatedItem = res.doc_data || {
          id: res.document_id || `doc_${Date.now()}`,
          title: formData.custom_title || `${formData.document_type.toUpperCase()} AGREEMENT`,
          document_type: formData.document_type,
          parties: formData.parties,
          terms: formData.terms,
          effective_date: formData.effective_date,
          created_at: new Date().toISOString().replace('T', ' ').substring(0, 16),
          status: 'Draft',
          content: res.document,
          font_family: formData.font_family,
          logo_base64: formData.logo_base64
        };

        setActiveDoc(generatedItem);
        setDocuments(prev => [generatedItem, ...prev.filter(d => d.id !== generatedItem.id)]);
        setActiveTab('preview');
      }
    } catch (err) {
      alert("Error generating document: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Template Selection
  const handleUseTemplate = (tmpl) => {
    setGeneratorPrefill({
      type: tmpl.type,
      parties: tmpl.parties_example || 'Party A, Party B',
      terms: tmpl.terms_example || 'Standard terms and confidentiality apply.',
      effective_date: new Date().toISOString().split('T')[0]
    });
    setActiveTab('generator');
  };

  // Handle Save Edited Document
  const handleSaveEditedDoc = async (updatedDoc) => {
    setActiveDoc(updatedDoc);
    setDocuments(prev => prev.map(d => d.id === updatedDoc.id ? updatedDoc : d));
    await updateDocument(updatedDoc.id, {
      title: updatedDoc.title,
      content: updatedDoc.content,
      parties: updatedDoc.parties,
      terms: updatedDoc.terms
    });
    setActiveTab('preview');
  };

  // Handle Delete Document
  const handleDeleteDoc = async (docId) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      setDocuments(prev => prev.filter(d => d.id !== docId));
      await deleteDocument(docId);
      if (activeDoc && activeDoc.id === docId) {
        setActiveDoc(null);
        setActiveTab('dashboard');
      }
    }
  };

  // Handle File Export
  const handleExport = async (format, docData) => {
    const targetDoc = docData || activeDoc;
    if (!targetDoc) return;
    await exportDocument(format, targetDoc);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        backendOnline={backendOnline} 
      />

      {/* Page Routing */}
      <div style={{ flex: 1 }}>
        {activeTab === 'landing' && (
          <LandingPage 
            onGetStarted={() => setActiveTab('generator')}
            onUseTemplate={handleUseTemplate}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard 
            documents={documents}
            onCreateNew={() => { setGeneratorPrefill(null); setActiveTab('generator'); }}
            onViewDoc={(doc) => { setActiveDoc(doc); setActiveTab('preview'); }}
            onEditDoc={(doc) => { setActiveDoc(doc); setActiveTab('editor'); }}
            onDeleteDoc={handleDeleteDoc}
            onExportDoc={handleExport}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === 'generator' && (
          <DocumentGenerator 
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            prefillData={generatorPrefill}
          />
        )}

        {activeTab === 'preview' && activeDoc && (
          <DocumentPreview 
            documentData={activeDoc}
            onEdit={() => setActiveTab('editor')}
            onExport={handleExport}
            onBack={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'editor' && activeDoc && (
          <DocumentEditor 
            documentData={activeDoc}
            onSave={handleSaveEditedDoc}
            onCancel={() => setActiveTab('preview')}
            onRegenerate={() => {
              setGeneratorPrefill({
                type: activeDoc.document_type,
                parties: activeDoc.parties,
                terms: activeDoc.terms,
                effective_date: activeDoc.effective_date
              });
              setActiveTab('generator');
            }}
          />
        )}

        {activeTab === 'templates' && (
          <TemplateLibrary 
            templates={templates}
            onUseTemplate={handleUseTemplate}
          />
        )}
      </div>
    </div>
  );
}
