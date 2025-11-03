import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Modal para mostrar detalles del trabajo aplicado
const AppliedJobModal = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-lg">
        <h2 className="text-2xl font-bold mb-4">{job.name}</h2>
        <p><strong>Empresa:</strong> {job.company.companyName}</p>
        <p><strong>Tipo:</strong> {job.esPasantia ? 'Pasantía' : 'Trabajo'}</p>
        <p className="mt-4">{job.description || 'Sin descripción disponible.'}</p>
        <button
          onClick={onClose}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

// Card para cada trabajo aplicado
const AppliedJobCard = ({ job, onViewMore }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 relative">
      <img src={job.imageUrl} alt={job.name} className="w-full h-32 object-cover" />
      <h3 className="text-lg font-bold mt-4">{job.name}</h3>
      <p className="text-gray-800">{job.company.companyName}</p>
      <p className="text-gray-500">{job.esPasantia ? 'Pasantía' : 'Trabajo'}</p>
      <button
        onClick={() => onViewMore(job._id)}
        className="absolute bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
      >
        Ver más
      </button>
    </div>
  );
};

const TrabajosAP = () => {
  const [appliedJobs, setAppliedJobs] = useState([]); // Trabajos aplicados por el usuario
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        // Supongamos que la API para obtener los trabajos aplicados por el usuario autenticado es:
        // GET http://localhost:3000/api/user/applied-jobs
        const token = localStorage.getItem('token'); // Recuperar el token para autenticación
        const response = await axios.get('https://api-grupo-software.onrender.com/api/user/applied-jobs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppliedJobs(response.data.appliedJobs); // Guardar los trabajos aplicados en el estado
      } catch (error) {
        console.error('Error al obtener los trabajos aplicados:', error);
      }
    };

    fetchAppliedJobs();
  }, []);

  const handleViewMore = async (jobId) => {
    try {
      const token = localStorage.getItem('token'); // Recuperar el token para autenticación
      const response = await axios.get(`https://api-grupo-software.onrender.com/api/vacant/work/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedJob(response.data); // Guardar los detalles del trabajo seleccionado
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error al obtener los detalles del trabajo:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center my-6">Trabajos Aplicados</h1>
      {appliedJobs.length === 0 ? (
        <p className="text-center text-gray-600">No has aplicado a ningún trabajo todavía.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {appliedJobs.map((job) => (
            <AppliedJobCard key={job._id} job={job} onViewMore={handleViewMore} />
          ))}
        </div>
      )}

      {isModalOpen && <AppliedJobModal job={selectedJob} onClose={handleCloseModal} />}
    </div>
  );
};

export default TrabajosAP;
