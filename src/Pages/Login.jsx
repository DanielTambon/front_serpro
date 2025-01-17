// import React, { useState } from 'react';
// import { useDataContext } from '../Context/DataContext';
// export default function LoginScreen() {
//   const [email, setEmail] = useState('');
//   const [senha, setSenha] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const { login, loading, error } = useDataContext();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = await login(email, senha);
//     if (token) {
//       console.log('Token obtido:', token);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
//         <div>
//           <img
//             className="mx-auto h-20 w-auto"
//             src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/serpro-wghwcyBUqakcBYnvmOMuNVJOi2P0Qn.png"
//             alt="Serpro Logo"
//           />
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             SIGEPE-AFD
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Sistema Integrado de Gestão de Pessoas
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div className="relative">
//               <label htmlFor="email-address" className="sr-only">
//                 Email
//               </label>
//               <span className="absolute top-3 left-3 text-gray-400">👤</span>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="relative">
//               <label htmlFor="password" className="sr-only">
//                 Senha
//               </label>
//               <span className="absolute top-3 left-3 text-gray-400">🔒</span>
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 autoComplete="current-password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Senha"
//                 value={senha}
//                 onChange={(e) => setSenha(e.target.value)}
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <span className="h-5 w-5 text-gray-400">🙈</span>
//                 ) : (
//                   <span className="h-5 w-5 text-gray-400">👁️</span>
//                 )}
//               </button>
//             </div>
//           </div>

//           {error && (
//             <div className="rounded-md bg-red-50 p-4">
//               <div className="flex">
//                 <div className="ml-3">
//                   <h3 className="text-sm font-medium text-red-800">
//                     Erro ao realizar login
//                   </h3>
//                   <div className="mt-2 text-sm text-red-700">
//                     <p>{error}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
//             >
//               {loading ? (
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//               ) : (
//                 'Entrar'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../Context/DataContext';
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error, isAuthenticated } = useDataContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists on component mount
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // Also redirect when isAuthenticated changes
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await login(email, senha);
    if (token) {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <img
            className="mx-auto h-20 w-auto"
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/serpro-wghwcyBUqakcBYnvmOMuNVJOi2P0Qn.png"
            alt="Serpro Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            SIGEPE-AFD
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sistema Integrado de Gestão de Pessoas
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <span className="absolute top-3 left-3 text-gray-400">👤</span>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <span className="absolute top-3 left-3 text-gray-400">🔒</span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <span className="h-5 w-5 text-gray-400">🙈</span>
                ) : (
                  <span className="h-5 w-5 text-gray-400">👁️</span>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Erro ao realizar login
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Entrar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

