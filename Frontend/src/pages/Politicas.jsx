import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const JobCard = ({ name, company, esPasantia, image }) => {
  const navigate = useNavigate(); 
  
  const handleViewMore = () => {
    navigate('/pasantiasuo'); 
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 relative">
      <img src={image} alt={name} className="w-full h-32 object-cover" />
      <h3 className="text-lg font-bold mt-4">{name}</h3>
      <p className="text-gray-800">{company.companyName}</p>
      <p className="text-gray-500">{esPasantia ? "Pasantia" : "Trabajo"}</p>
      <button onClick={handleViewMore} className="absolute bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300">
        Ver más
      </button>
    </div>
  );
};

const TrabajosPage = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate(); // Hook para manejar la navegación

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let url = 'https://api-grupo-software.onrender.com/api/vacant/work'; // Reemplaza con tu URL real
        if (search) {
          url += `/categoria=${search}`; // Asume que la API puede filtrar por categoría
        }
        const response = await axios.get(url);
        setJobs(response.data); // Asume que la API devuelve un array de trabajos
      } catch (error) {
        console.error('Error al obtener los trabajos:', error);
      }
    };

    fetchJobs();
  }, [search]);
 
  const handleViewMoreGeneral = () => {
    navigate('/pasantiasuo'); 
  };

  const handleViewMoreGeneral2 = () => {
    navigate('/pasantia'); 
  };

  return(
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center my-6">PASANTÍAS: ÚLTIMAS OFERTAS</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job._id} {...job} image={job.imageUrl} />
        ))}
      </div>
      <div className="text-center mt-6">
        <button onClick={handleViewMoreGeneral} className="text-blue-600 hover:underline">
          Ver más
        </button>
      </div>
    </div>
  );
};

export default TrabajosPage;
