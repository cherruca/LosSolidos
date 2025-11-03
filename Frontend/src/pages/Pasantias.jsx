import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 🔹 Modal para ver los detalles del trabajo
const JobModal = ({ job, onClose, onApply }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">{job.tittle}</h2>
        <p className="mt-4">{job.description || 'Sin descripción disponible.'}</p>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={() => onApply(job._id)}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
          >
            Aplicar
          </button>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

// 🔹 Tarjeta de trabajo individual
const JobCard = ({ job, onViewMore }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 relative">
      <img
        src={job.imageUrl || 'https://via.placeholder.com/150'}
        alt={job.tittle}
        className="w-full h-32 object-cover"
      />
      <h3 className="text-lg font-bold mt-4">{job.tittle}</h3>
      <button
        onClick={() => onViewMore(job._id)}
        className="absolute bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
      >
        Ver más
      </button>
    </div>
  );
};

// 🔹 Página principal de Pasantías
const PasantiasPage = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Obtener las pasantías desde el backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token no encontrado');
          return;
        }

        const response = await axios.get('https://api-grupo-software.onrender.com/api/job-offers/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Respuesta de la API:', response.data);
        setJobs(response.data);
      } catch (error) {
        console.error('Error al obtener los trabajos:', error);
      }
    };

    fetchJobs();
  }, []);

  // Manejar búsqueda
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Ver detalles de un trabajo específico
  const handleViewMore = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token no encontrado');
        return;
      }

      const response = await axios.get(`https://api-grupo-software.onrender.com/api/job-offers/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSelectedJob(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error al obtener los detalles del trabajo:', error);
    }
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  // Aplicar a una pasantía
  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Usuario no autenticado');
        return;
      }

      const id = localStorage.getItem('id'); // ID del usuario
      const applicationData = { userId: id };

      await axios.post(`https://api-grupo-software.onrender.com/api/apply/${jobId}`, applicationData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Aplicación enviada con éxito');
      handleCloseModal();
    } catch (error) {
      console.error('Error al enviar la aplicación:', error);
      alert('No se pudo enviar la aplicación.');
    }
  };

  // Renderizado principal
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center my-6">Pasantías</h1>
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Buscar por nombre"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs
            .filter((job) =>
              job?.tittle?.toLowerCase().includes(search.toLowerCase())
            )
            .map((job) => (
              <JobCard key={job._id} job={job} onViewMore={handleViewMore} />
            ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No se encontraron Pasantías disponibles.
        </p>
      )}

      {isModalOpen && (
        <JobModal job={selectedJob} onClose={handleCloseModal} onApply={handleApply} />
      )}
    </div>
  );
};

export default PasantiasPage;
