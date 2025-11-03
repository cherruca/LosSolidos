import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/Logo.svg';
import { useAuth } from '../context/AuthProvide';

const Navbar = () =>  {
    const { userRole, isAuthenticated, logout} = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

  // Verificar autenticación al cargar la página
  useEffect(() => {
    const token = localStorage.getItem('token');
    // Si el token existe, está autenticado
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout_ = () => {
    localStorage.removeItem('token'); // Elimina el token del localStorage
    logout();
    window.location.href = '/'; // Redirigir al inicio
  };

  return (
    <nav className="flex justify-between items-center p-6" style={{ backgroundColor: '#003DA5' }}>
      {/* Logo */}
      <div className="flex items-center">
        <img src={Logo} alt="logo" className="mr-2 w-15 h-14" />
        <span className="font-semibold text-xl tracking-tight text-white">PROFESSIONET</span>
      </div>

      {/* Botón de menú móvil */}
      <button onClick={toggleMenu} className="text-white md:hidden z-20">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Menú de navegación */}
      <div
        className={`md:flex md:items-center md:justify-end ${
          isOpen ? 'fixed' : 'hidden'
        } inset-x-0 top-0 transform transition-transform duration-300 ease-in-out z-10 md:relative md:top-auto md:left-auto md:h-auto md:visible md:opacity-100 md:translate-x-0`}
        style={{ backgroundColor: isOpen ? '#172554' : 'transparent' }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center h-screen md:h-auto">
          {/* Mostrar enlaces solo si está autenticado */}
          {isAuthenticated && (
            <>
              <Link
                to="/"
                className="text-white hover:text-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/TrabajosAP"
                className="text-white hover:text-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Trabajos Aplicados
              </Link>

              <Link
                to="/CV"
                className="text-white hover:text-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Mi CV
              </Link>

            </>
          )}

          {/* Opciones de usuario */}
          {!isAuthenticated ? (
            // Mostrar "Iniciar sesión" y "Registrarse" si no está autenticado
            <div className="flex flex-col md:flex-row my-2 md:my-0 md:ml-4 space-y-2 md:space-y-0 md:space-x-2">
              <Link
                to="/login"
                className="text-white hover:text-opacity-75 block px-3 py-2 rounded-md text-base font-medium border border-white border-solid"
                onClick={() => setIsOpen(false)}
              >
                Iniciar sesión
              </Link>
              <Link
                to="/Registro"
                className="text-white hover:text-opacity-75 block px-3 py-2 rounded-md text-base font-medium border border-white border-solid"
                onClick={() => setIsOpen(false)}
              >
                Registrarse
              </Link>
            </div>
          ) : (
            // Mostrar "Cerrar sesión" si está autenticado
            <div className="flex items-center space-x-4">
              <button
                onClick={logout_}
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
