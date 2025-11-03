import React from 'react';
import { Link } from 'react-router-dom';
import UserIcon from '../assets/user.svg'; 
import BusinessIcon from '../assets/empresa.svg'; 

export default function Registro() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-teal-500 flex flex-col items-center justify-center">
      <div className="text-4xl text-white mb-8">REGISTRO</div>
      <div className="flex justify-around items-center w-full max-w-4xl">
        <Link to="/RegistroU" className="flex flex-col items-center">
          <img src={UserIcon} alt="Registro de Usuario" className="w-24 h-24 mb-2"/>
          <span className="bg-white text-blue-800 py-2 px-4 rounded-full">Registro de Usuario</span>
        </Link>
        <Link to="/RegistroE" className="flex flex-col items-center">
          <img src={BusinessIcon} alt="Registro de Empresa" className="w-24 h-24 mb-2"/>
          <span className="bg-white text-blue-800 py-2 px-4 rounded-full">Registro de Empresa</span>
        </Link>
      </div>
    </div>
  );
}
  