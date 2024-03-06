import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { About } from './components/About';
import { Users } from './components/Users';
import { Navbar } from './components/Navbar';
import { LoginButton } from './components/Auth';
import { useAuth0 } from "@auth0/auth0-react";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isAuthenticated, logout } = useAuth0(); // Obtener la función de logout de useAuth0

  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  // Función para manejar el logout
const handleLogout = () => {
  const confirmLogout = window.confirm("¿Estás seguro de que deseas salir de tu sesión?");
  if (confirmLogout) {
    logout({ returnTo: window.location.origin }); // Redirigir al origen después del logout
    setIsLoggedIn(false); // Actualizar el estado de autenticación en la aplicación
  }
};

  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Navbar />
          <div className='container p-2'>
            <Routes>
              <Route path="/About" element={<About />} />
              <Route path="/" element={<Users />} />
            </Routes>
            <button onClick={handleLogout}  
             className="btn btn-danger btn-block" style={{
          fontSize: '20px',
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease 0s',
          cursor: 'pointer',
          outline: 'none',
        }}
            >Logout</button> {/* Botón de logout */}
          </div>
        </>
      ) : (
        <LoginButton />
      )}
    </Router>
  );
}

export default App;