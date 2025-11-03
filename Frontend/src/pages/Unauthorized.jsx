import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-red-500 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Acceso no autorizado
        </h2>
        <p className="text-gray-600 mb-6">
          Lo sentimos, no tienes permisos para acceder a esta página.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-300"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;