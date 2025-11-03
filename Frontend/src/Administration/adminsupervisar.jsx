import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import axios from 'axios';

const ApplicationCard = ({ applicantName, offerTitle, status }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h3 className="text-lg font-bold">Postulante: {applicantName}</h3>
    <p className="text-gray-800">Oferta: {offerTitle}</p>
    <p className="text-gray-500">Estado: {status}</p>
  </div>
);

const AdminApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Obtener el token de autenticación desde localStorage
        const token = localStorage.getItem('token');

        // Realizar la solicitud a la API con el token en los encabezados
        const response = await axios.get('GET https://api-grupo-software.onrender.com/api/applications/:ofertaId', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Actualizar el estado con las postulaciones obtenidas
        setApplications(response.data.applications);
      } catch (err) {
        console.error('Error al obtener las postulaciones:', err);
        setError('No se pudieron cargar las postulaciones. Inténtalo más tarde.');
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-center my-6">Postulaciones de Usuarios</h1>
      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {applications.map((application) => (
            <ApplicationCard key={application._id} {...application} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminApplicationsPage;
