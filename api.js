const API_BASE_URL = "http://localhost:8000/api";

// Built-in offline fallback generator if API backend is restarting
function localFallbackGenerate(payload) {
  const { document_type, parties, terms, effective_date, custom_title } = payload;
  const partyList = parties.split(',').map(p => p.trim()).filter(Boolean);
  const partyA = partyList[0] || "Party A";
  const partyB = partyList[1] || "Party B";
  const clauses = terms.split(';').map(t => t.trim()).filter(Boolean);
  
  const title = custom_title || `${document_type.toUpperCase()} AGREEMENT`;
  
  let formattedTerms = "";
  clauses.forEach((c, idx) => {
    formattedTerms += `3.${idx + 1} Stipulation ${idx + 1}: ${c}.\n`;
  });

  const text = `${title}

THIS ${document_type.toUpperCase()} (the "Agreement") is made effective as of ${effective_date} (the "Effective Date"), by and between:

PARTIES:
1. ${partyA} ("First Party")
2. ${partyB} ("Second Party")

RECITALS:
WHEREAS, the parties desire to establish formal legal terms governing their relationship regarding ${document_type};

NOW, THEREFORE, the parties agree as follows:

1. DEFINITIONS AND INTERPRETATION
1.1 "Agreement" refers to this ${document_type} contract.
1.2 "Effective Date" shall mean ${effective_date}.

2. SCOPE AND OBLIGATIONS
2.1 Both parties agree to execute their respective duties with due diligence and in accordance with law.

3. SPECIFIC TERMS & CONDITIONS
${formattedTerms || "3.1 Strict confidentiality and timeliness must be observed."}

4. GOVERNING LAW & JURISDICTION
4.1 Governed by the laws of the State of Delaware, USA.

IN WITNESS WHEREOF, the parties execute this Agreement as of ${effective_date}.

_____________________________          _____________________________
${partyA}                              ${partyB}
Date: ${effective_date}                 Date: ${effective_date}`;

  return {
    success: true,
    document_id: "doc_" + Math.random().toString(36).substring(2, 9),
    document: text,
    doc_data: {
      id: "doc_" + Math.random().toString(36).substring(2, 9),
      title: title,
      document_type: document_type,
      parties: parties,
      terms: terms,
      effective_date: effective_date,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: "Draft",
      content: text
    }
  };
}

export async function checkBackendStatus() {
  try {
    const res = await fetch("http://localhost:8000/");
    if (res.ok) return true;
  } catch (e) {
    return false;
  }
  return false;
}

export async function generateDocument(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.warn("Backend API not reachable, utilizing local legal generator fallback:", err);
    return localFallbackGenerate(data);
  }
}

export async function fetchDocuments() {
  try {
    const response = await fetch(`${API_BASE_URL}/documents`);
    if (response.ok) {
      const data = await response.json();
      return data.documents;
    }
  } catch (err) {
    console.warn("Failed to fetch documents from backend:", err);
  }
  return [];
}

export async function fetchTemplates() {
  try {
    const response = await fetch(`${API_BASE_URL}/templates`);
    if (response.ok) {
      const data = await response.json();
      return data.templates;
    }
  } catch (err) {
    console.warn("Failed to fetch templates:", err);
  }
  return [];
}

export async function updateDocument(docId, updates) {
  try {
    const response = await fetch(`${API_BASE_URL}/documents/${docId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn("Failed to update document:", err);
  }
  return null;
}

export async function deleteDocument(docId) {
  try {
    const response = await fetch(`${API_BASE_URL}/documents/${docId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true;
    }
  } catch (err) {
    console.warn("Failed to delete document:", err);
  }
  return false;
}

export async function exportDocument(format, docData) {
  const endpoint = `${API_BASE_URL}/export/${format.toLowerCase()}`;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(docData),
    });
    
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${docData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${format.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      return true;
    }
  } catch (err) {
    console.error(`Export ${format} failed via API, triggering browser file download:`, err);
  }
  
  // Local file download fallback
  const blob = new Blob([docData.content], { type: "text/plain;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${docData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${format.toLowerCase()}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
  return true;
}
