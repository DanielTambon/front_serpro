import React, { useEffect } from 'react';
import { useDataContext } from '../Context/DataContext';
import { format } from 'date-fns';

export default function DocumentsListModal({ servidor, onClose }) {
  const { 
    fetchServerDocuments, 
    serverDocuments, 
    documentsStatus,
    downloadDocument,
    downloadStatus
  } = useDataContext();

  useEffect(() => {
    fetchServerDocuments(servidor.cpf);
  }, [servidor.cpf]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all animate-modalIn">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-[#003399]">
            Documentos de {servidor.nome}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#003399] rounded-full p-1"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {documentsStatus.loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003399]"></div>
            </div>
          ) : documentsStatus.error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Erro!</strong>
              <span className="block sm:inline"> {documentsStatus.error}</span>
            </div>
          ) : serverDocuments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhum documento encontrado para este servidor.
            </div>
          ) : (
            <div className="space-y-4">
              {serverDocuments.map((doc) => (
                <div
                  key={doc.id_documento}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{doc.tipo_documento}</h4>
                    <p className="text-sm text-gray-500">
                      Cadastrado em: {format(new Date(doc.hora_cadastro_documento), 'dd/MM/yyyy HH:mm')}
                    </p>
                  </div>
                  <button
                    onClick={() => downloadDocument(doc.id_documento)}
                    disabled={downloadStatus.loading}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {downloadStatus.loading ? '⏳' : '📥'} Baixar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end px-6 py-4 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003399]"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

