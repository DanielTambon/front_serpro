// import React, { useState } from 'react';
// import { useDataContext } from '../Context/DataContext';
// import UploadModal from '../Components/UploadModal'
// export default function ResultsTable() {
//   const [selectedServidor, setSelectedServidor] = useState(null);
//   const [showUploadModal, setShowUploadModal] = useState(false);
//   const { results, downloadDocument, downloadStatus } = useDataContext();

//   const handleDownload = async (documentId) => {
//     try {
//       await downloadDocument(documentId);
//     } catch (error) {
//       console.error('Erro ao baixar documento:', error);
//     }
//   };

//   // Check if results or results.servidores is empty
//   if (!results?.servidores?.length) {
//     return (
//       <div className="bg-yellow-50 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
//         <strong className="font-bold">Atenção!</strong>
//         <span className="block sm:inline"> Nenhum resultado encontrado para os filtros informados.</span>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 animate-fadeIn">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-[#003399]">Resultados da Pesquisa</h2>
//         <div className="h-1 w-20 bg-[#003399] rounded-full"/>
//       </div>

//       {downloadStatus?.error && (
//         <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//           <strong className="font-bold">Erro!</strong>
//           <span className="block sm:inline"> {downloadStatus.error}</span>
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matrícula</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lotação</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Órgão</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {results.servidores.map((servidor) => (
//               <tr key={servidor.id} className="hover:bg-gray-50 transition-colors duration-200">
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                     servidor.ativo 
//                       ? 'bg-green-100 text-green-800' 
//                       : 'bg-red-100 text-red-800'
//                   }`}>
//                     {servidor.ativo ? 'Ativo' : 'Inativo'}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {servidor.nome}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {servidor.cpf}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {servidor.matricula}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {servidor.cargo}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {servidor.lotacao}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {servidor.codigo_orgao}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleDownload(servidor.id)}
//                       disabled={downloadStatus?.loading}
//                       className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
//                     >
//                       {downloadStatus?.loading ? '⏳' : '📥'} Baixar
//                     </button>
//                     <button
//                       onClick={() => {
//                         setSelectedServidor(servidor);
//                         setShowUploadModal(true);
//                       }}
//                       className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#003399] hover:bg-[#002266] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003399]"
//                     >
//                       📤 Upload
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Upload Modal */}
//       {showUploadModal && selectedServidor && (
//         <UploadModal
//           servidor={selectedServidor}
//           onClose={() => {
//             setShowUploadModal(false);
//             setSelectedServidor(null);
//           }}
//         />
//       )}
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useDataContext } from '../Context/DataContext';
import UploadModal from './UploadModal'
import DocumentsListModal from './DocumentModal';
export default function ResultsTable() {
  const [selectedServidor, setSelectedServidor] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const { results, downloadDocument, downloadStatus } = useDataContext();

  const handleDownload = async (documentId) => {
    try {
      await downloadDocument(documentId);
    } catch (error) {
      console.error('Erro ao baixar documento:', error);
    }
  };

  if (!results?.servidores?.length) {
    return (
      <div className="bg-yellow-50 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Atenção!</strong>
        <span className="block sm:inline"> Nenhum resultado encontrado para os filtros informados.</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#003399]">Resultados da Pesquisa</h2>
        <div className="h-1 w-20 bg-[#003399] rounded-full"/>
      </div>

      {downloadStatus?.error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erro!</strong>
          <span className="block sm:inline"> {downloadStatus.error}</span>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matrícula</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lotação</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Órgão</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.servidores.map((servidor) => (
              <tr key={servidor.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    servidor.ativo 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {servidor.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {servidor.nome}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {servidor.cpf}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {servidor.matricula}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {servidor.cargo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {servidor.lotacao}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {servidor.codigo_orgao}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedServidor(servidor);
                        setShowDocumentsModal(true);
                      }}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      📋 Documentos
                    </button>
                    <button
                      onClick={() => {
                        setSelectedServidor(servidor);
                        setShowUploadModal(true);
                      }}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-[#003399] hover:bg-[#002266] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003399]"
                    >
                      📤 Upload
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      {showUploadModal && selectedServidor && (
        <UploadModal
          servidor={selectedServidor}
          onClose={() => {
            setShowUploadModal(false);
            setSelectedServidor(null);
          }}
        />
      )}

      {/* Documents List Modal */}
      {showDocumentsModal && selectedServidor && (
        <DocumentsListModal
          servidor={selectedServidor}
          onClose={() => {
            setShowDocumentsModal(false);
            setSelectedServidor(null);
          }}
        />
      )}
    </div>
  );
}

