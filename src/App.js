// import React from 'react';
// import { DataProvider } from './Context/DataContext';
// import { useDataContext } from './Context/DataContext';
// import LoginScreen from './Pages/Login';
// import FilterScreen from './Components/FilterScreen';
// import 'tailwindcss/tailwind.css';


// function App() {
//   return (
//     <DataProvider>
//       <AppContent />
//     </DataProvider>
//   );
// }

// function AppContent() {
//   const  isAuthenticated  = React.useContext(useDataContext);

//   return (
//     <main>
//       {isAuthenticated ? <FilterScreen /> : <LoginScreen />}
//     </main>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './Context/DataContext';
import LoginScreen from './Pages/Login';
import FilterScreen from './Components/FilterScreen';
import 'tailwindcss/tailwind.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <FilterScreen />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;

