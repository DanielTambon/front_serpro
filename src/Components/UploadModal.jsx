import React, { useState } from 'react';
import { useDataContext } from '../Context/DataContext';
export default function UploadModal({ servidor, onClose }) {
  const [file, setFile] = useState(null);
  const [tipoDocumento, setTipoDocumento] = useState('');
  const { uploadDocument, uploadStatus } = useDataContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await uploadDocument(file, servidor.cpf, tipoDocumento);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Erro no upload:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all animate-modalIn">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-[#003399]">
            Upload de Documento - {servidor.nome}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003399] rounded-full p-1"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Arquivo
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo do Documento
            </label>
            <input
              type="text"
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-[#003399] focus:ring-[#003399]"
              placeholder="Ex: Atestado, Declaração, etc."
              required
            />
          </div>

          {uploadStatus.error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {uploadStatus.error}
            </div>
          )}

          {uploadStatus.success && (
            <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              Documento enviado com sucesso!
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003399]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={uploadStatus.loading}
              className="px-4 py-2 text-sm font-medium text-white bg-[#003399] border border-transparent rounded-md hover:bg-[#002266] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003399] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadStatus.loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </div>
              ) : (
                'Enviar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

