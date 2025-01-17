import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultsTable from './ResultTable';
import { useDataContext } from '../Context/DataContext';
export default function FilterScreen() {
  const navigate = useNavigate();
  const { filters, updateFilters, clearFilters, searchServers, results, loading, error, logout } = useDataContext();
  const [showResults, setShowResults] = useState(false);

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatMatricula = (value) => {
    return value.replace(/\D/g, '').slice(0, 7);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      updateFilters({ [name]: formatCPF(value) });
    } else if (name === 'matricula') {
      updateFilters({ [name]: formatMatricula(value) });
    } else {
      updateFilters({ [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await searchServers();
    setShowResults(true);
  };

  const handleClearFilters = () => {
    clearFilters();
    setShowResults(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Logo and Logout */}
        <div className="flex flex-col items-center mb-8 relative">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/serpro-wghwcyBUqakcBYnvmOMuNVJOi2P0Qn.png"
            alt="Serpro Logo" 
            className="h-20 mb-4 transform hover:scale-105 transition-transform duration-300"
          />
          <h1 className="text-3xl font-bold text-[#003399] tracking-tight">SIGEPE-AFD</h1>
          <button
            onClick={handleLogout}
            className="absolute top-0 right-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#003399] hover:bg-[#002266] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003399]"
          >
            <span>🚪</span>
            Sair
          </button>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Filter Card */}
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 transform transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#003399]">Filtros de Pesquisa</h2>
              <div className="h-1 w-20 bg-[#003399] rounded-full"/>
            </div>
            
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              {/* Nome do Servidor */}
              <div className="md:col-span-2">
                <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-1">
                  Nome do Servidor *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  value={filters.nome}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#003399] focus:ring-[#003399] transition-colors duration-200"
                  placeholder="Digite o nome completo ou parcial"
                />
              </div>

              {/* CPF */}
              <div>
                <label htmlFor="cpf" className="block text-sm font-semibold text-gray-700 mb-1">
                  CPF
                </label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={filters.cpf}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#003399] focus:ring-[#003399] transition-colors duration-200"
                  placeholder="000.000.000-00"
                  maxLength="14"
                />
              </div>

              {/* Matrícula */}
              <div>
                <label htmlFor="matricula" className="block text-sm font-semibold text-gray-700 mb-1">
                  Matrícula
                </label>
                <input
                  type="text"
                  id="matricula"
                  name="matricula"
                  value={filters.matricula}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#003399] focus:ring-[#003399] transition-colors duration-200"
                  placeholder="0000000"
                  maxLength="7"
                />
              </div>

              {/* Órgão */}
              <div className="md:col-span-2">
                <label htmlFor="codigo_orgao" className="block text-sm font-semibold text-gray-700 mb-1">
                  Código do Órgão
                </label>
                <input
                  type="text"
                  id="codigo_orgao"
                  name="codigo_orgao"
                  value={filters.codigo_orgao}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#003399] focus:ring-[#003399] transition-colors duration-200"
                  placeholder="Digite o código do órgão"
                />
              </div>

              {/* Action Buttons */}
              <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#003399] text-white px-6 py-3 rounded-lg hover:bg-[#002266] focus:outline-none focus:ring-2 focus:ring-[#003399] focus:ring-offset-2 flex items-center justify-center gap-2 transform transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Pesquisando...
                    </>
                  ) : (
                    <>
                      <span>🔍</span>
                      Pesquisar
                      <span>➡️</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="flex-1 bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#003399] focus:ring-offset-2 flex items-center justify-center gap-2 transform transition-all duration-200 hover:scale-105 shadow-md"
                >
                  <span>❌</span>
                  Limpar Filtros
                </button>
              </div>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Erro!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          {/* Results Table */}
          {showResults && <ResultsTable results={results} />}
        </div>
      </div>
    </div>
  );
}

