import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PerfilEmpresa() {
  const [perfil, setPerfil] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('todos'); // Estado para controlar el filtro
  const navigate = useNavigate();

  // Obtener datos de la empresa y ofertas
  useEffect(() => {
    const obtenerDatosEmpresa = async () => {
      try {
        const token = localStorage.getItem('token');
        // Obtener datos reales de la API
        const perfilResponse = await axios.get('https://api-grupo-software.onrender.com/api/auth/companyinfo:id', {
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        setPerfil(perfilResponse.data);

        const ofertasResponse = await axios.get('/');
        setJobs(ofertasResponse.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        alert('Hubo un problema al cargar los datos. Inténtalo más tarde.');
      }

      // Mockdata comentada
      /*
      const perfilFicticio = {
        companyName: 'TechCorp',
        department: 'Desarrollo de Software',
        email: 'contacto@techcorp.com',
      };
      setPerfil(perfilFicticio);

      const ofertasFicticias = [
        {
          _id: '1',
          name: 'Desarrollador Frontend',
          description: 'Trabaja con tecnologías modernas para crear interfaces de usuario atractivas.',
          imageUrl: 'https://via.placeholder.com/150',
          companyName: 'TechCorp',
          esPasantia: false,
        },
        {
          _id: '2',
          name: 'Desarrollador Backend',
          description: 'Ayuda a construir y mantener los sistemas y servidores que respaldan nuestros servicios.',
          imageUrl: 'https://via.placeholder.com/150',
          companyName: 'TechCorp',
          esPasantia: true,
        },
        {
          _id: '3',
          name: 'Diseñador UI/UX',
          description: 'Crea experiencias de usuario innovadoras con un enfoque centrado en el cliente.',
          imageUrl: 'https://via.placeholder.com/150',
          companyName: 'TechCorp',
          esPasantia: false,
        },
      ];
      setJobs(ofertasFicticias);
      */
    };

    obtenerDatosEmpresa();
  }, []);

  const handleEditJob = (job) => {
    navigate('/EmpresaOF', { state: { job } }); // Pasar la oferta como estado
  };

  const handleDeleteJob = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta oferta?')) {
      try {
        await axios.delete(`/api/empresa/ofertas/${id}`);
        setJobs(jobs.filter((job) => job._id !== id));
      } catch (error) {
        console.error('Error al eliminar la oferta:', error);
        alert('No se pudo eliminar la oferta. Inténtalo más tarde.');
      }
    }
  };

  const JobCard = ({ _id, name, description, imageUrl, companyName, esPasantia }) => {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 relative">
        <img src={imageUrl} alt={name} className="w-full h-32 object-cover" />
        <h3 className="text-lg font-bold mt-4">{name}</h3>
        <p className="text-gray-800">{companyName}</p>
        <p className="text-gray-500 mb-4">{esPasantia ? 'Pasantía' : 'Trabajo'}</p>
        <p className="text-gray-700">{description}</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={() =>
              handleEditJob({ _id, name, description, imageUrl, companyName, esPasantia })
            }
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full"
          >
            Editar
          </button>
          <button
            onClick={() => handleDeleteJob(_id)}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full"
          >
            Eliminar
          </button>
        </div>
      </div>
    );
  };

  // Filtrar ofertas según el tipo (pasantía o no)
  const filteredJobs = jobs.filter((job) => {
    if (filter === 'todos') return true; // Mostrar todas las ofertas
    return job.esPasantia === (filter === 'pasantia');
  });

  if (!perfil) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Información de la empresa */}
        <div className="col-span-1 bg-blue-600 p-4 rounded-lg text-white">
          <h3 className="text-xl font-bold mb-4">Información de la Empresa</h3>
          <p>
            <strong>Nombre:</strong> {perfil.companyName}
          </p>
          <p>
            <strong>Departamento:</strong> {perfil.department}
          </p>
          <p>
            <strong>Email:</strong> {perfil.email}
          </p>
          <br />
          <Link
            to="/EmpresaOF"
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-full transition duration-300"
          >
            Agregar Vacante
          </Link>
          <br />
          <button
            onClick={() => navigate('/Respuestas')}
            className="mt-4 bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-full transition duration-300"
          >
            Ver Respuestas de Candidatos
          </button>
        </div>

        {/* Filtro de ofertas */}
        <div className="col-span-2">
          <h3 className="text-xl font-bold mb-4">Vacantes Publicadas</h3>
          <div className="mb-4">
            <label
              htmlFor="filtro"
              className="mr-2 text-lg font-semibold"
            >
              Filtrar por:
            </label>
            <select
              id="filtro"
              className="border border-gray-300 p-2 rounded-lg"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="todos">Todas las ofertas</option>
              <option value="pasantia">Solo Pasantías</option>
              <option value="trabajo">Solo Trabajos</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => <JobCard key={job._id} {...job} />)
            ) : (
              <p>No hay vacantes publicadas para el filtro seleccionado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
