import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({ loading: false, error: null, success: false });
  const [downloadStatus, setDownloadStatus] = useState({ loading: false, error: null });
  const [filters, setFilters] = useState({
    nome: '',
    cpf: '',
    matricula: '',
    codigo_orgao: ''
  });
  const [results, setResults] = useState([]);
  const [documentsStatus, setDocumentsStatus] = useState({ loading: false, error: null });
  const [serverDocuments, setServerDocuments] = useState([]);

  const cleanCpf = (cpf) => cpf.replace(/\D/g, '');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, senha) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://serpro-project.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensagem || 'Erro ao realizar login');
      }

      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      return data.token;
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setResults([]);
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      nome: '',
      cpf: '',
      matricula: '',
      codigo_orgao: ''
    });
    setResults([]);
  };

  const searchServers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado. Por favor, faça login novamente.');
      }

      // Construir os parâmetros da query
      const queryParams = new URLSearchParams();
      if (filters.nome) queryParams.append('nome', filters.nome);
      if (filters.cpf) queryParams.append('cpf', filters.cpf);
      if (filters.matricula) queryParams.append('matricula', filters.matricula);
      if (filters.codigo_orgao) queryParams.append('codigo_orgao', filters.codigo_orgao);

      const response = await fetch(
        `https://serpro-project.onrender.com/consulta_servidor?${queryParams.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.mensagem || 'Erro ao buscar servidores');
      }

      setResults(data);
    } catch (err) {
      setError(err.message);
      if (err.message.includes('Token')) {
        setIsAuthenticated(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (file, cpf, tipoDocumento) => {
    setUploadStatus({ loading: true, error: null, success: false });
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado. Por favor, faça login novamente.');
      }

      const formData = new FormData();
      formData.append('arquivo', file);
      formData.append('cpf_servidor', cleanCpf(cpf));
      formData.append('tipo_documento', tipoDocumento);

      // Log the FormData contents (for debugging)
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await fetch('https://serpro-project.onrender.com/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensagem || 'Erro ao fazer upload do documento');
      }

      setUploadStatus({ loading: false, error: null, success: true });
      return data;
    } catch (err) {
      setUploadStatus({ loading: false, error: err.message, success: false });
      if (err.message.includes('Token')) {
        setIsAuthenticated(false);
      }
      throw err;
    }
  };

  const downloadDocument = async (id) => {
    setDownloadStatus({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado. Por favor, faça login novamente.');
      }

      const response = await fetch(`https://serpro-project.onrender.com/download/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensagem || 'Erro ao baixar documento');
      }

      // Get the filename from the Content-Disposition header or use a default
      const contentDisposition = response.headers.get('Content-Disposition');
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
        : `documento-${id}.pdf`;

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setDownloadStatus({ loading: false, error: null });
    } catch (err) {
      setDownloadStatus({ loading: false, error: err.message });
      if (err.message.includes('Token')) {
        setIsAuthenticated(false);
      }
      throw err;
    }
  };

  const fetchServerDocuments = async (cpf) => {
    setDocumentsStatus({ loading: true, error: null });
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token não encontrado. Por favor, faça login novamente.');
      }

      // Remove any non-digit characters from the CPF
      const cleanCpf = cpf.replace(/\D/g, '');
      console.log(cleanCpf)
      const response = await fetch(`https://serpro-project.onrender.com/consulta_documentos?cpf=${cleanCpf}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });

      // First check if the response is OK
      if (!response.ok) {
        const errorText = await response.text(); // Get the raw response text
        try {
          // Try to parse it as JSON
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.mensagem || 'Erro ao consultar documentos');
        } catch (parseError) {
          // If it can't be parsed as JSON, use the raw text or a default message
          throw new Error(errorText || 'Erro ao consultar documentos');
        }
      }

      // If response is OK, try to parse as JSON
      try {
        const data = await response.json();
        setServerDocuments(data.documentos || []);
        setDocumentsStatus({ loading: false, error: null });
        return data.documentos;
      } catch (parseError) {
        throw new Error('Erro ao processar resposta do servidor');
      }
    } catch (err) {
      setDocumentsStatus({ loading: false, error: err.message });
      if (err.message.includes('Token')) {
        setIsAuthenticated(false);
      }
      setServerDocuments([]); // Reset documents on error
      throw err;
    }
  };

  return (
    <DataContext.Provider value={{
      isAuthenticated,
      loading,
      error,
      login,
      logout,
      filters,
      updateFilters,
      clearFilters,
      results,
      searchServers,
      uploadDocument,
      uploadStatus,
      downloadDocument,
      downloadStatus,
      fetchServerDocuments,
      serverDocuments,
      documentsStatus
    }}>
      {children}
    </DataContext.Provider>
  );
};

