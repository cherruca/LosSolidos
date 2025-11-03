import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/Logo.svg';

export default function AdminNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false); 
    }, [location.pathname]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="flex justify-between items-center p-6" style={{ backgroundColor: '#003DA5' }}>
            <div className="flex items-center">
                <img src={Logo} alt="logo" className="mr-2 w-15 h-14" />
                <span className="font-semibold text-xl tracking-tight text-white">ADMIN PANEL</span>
            </div>

            <button onClick={toggleMenu} className="text-white md:hidden z-20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            <div className={`md:flex md:items-center md:justify-end ${
                isOpen ? 'fixed' : 'hidden'
              } inset-x-0 top-0 transform transition-transform duration-300 ease-in-out z-10 md:relative md:top-auto md:left-auto md:h-auto md:visible md:opacity-100 md:translate-x-0`} style={{ backgroundColor: isOpen ? '#172554' : 'transparent' }}>
                <div className="flex flex-col md:flex-row items-center justify-center h-screen md:h-auto">
                    <Link to="/admin/users" className="text-white hover:text-opacity-75 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>
                        Lista de Usuarios
                    </Link>
                    <Link to="/admin/offers" className="text-white hover:text-opacity-75 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>
                        Administración de Ofertas
                    </Link>
                    <Link to="/admin/applications" className="text-white hover:text-opacity-75 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>
                        Supervisar Postulaciones
                    </Link>
                    <div className="flex flex-col md:flex-row my-2 md:my-0 md:ml-4 space-y-2 md:space-y-0 md:space-x-2">
                        <Link to="/logout" className="text-white hover:text-opacity-75 block px-3 py-2 rounded-md text-base font-medium border border-white border-solid" onClick={() => setIsOpen(false)}>
                            Cerrar Sesión
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
