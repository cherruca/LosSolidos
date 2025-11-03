import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componente para mostrar cada oferta
const OfferCard = ({ tittle, description, company, applicants }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h3 className="text-lg font-bold">{tittle}</h3>
    <p className="text-gray-800 mt-2">{description}</p>
    <p className="text-gray-600 mt-2">Empresa: {company}</p>
    <p className="text-gray-500 mt-2">Postulantes: {applicants.length || 0}</p>
  </div>
);

const AdminOffersPage = () => {
  const [offers, setOffers] = useState([]); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const token = localStorage.getItem('token'); 

        const response = await axios.get('https://api-grupo-software.onrender.com/api/job-offers', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        // Depuración: imprime los datos recibidos de la API
        console.log('Datos de la API:', response.data);

        
        if (Array.isArray(response.data)) {
          setOffers(response.data); // 
        } else if (response.data.offers && Array.isArray(response.data.offers)) {
          setOffers(response.data.offers); // 
        } else {
          throw new Error('Formato de datos inesperado'); 
        }
      } catch (err) {
        console.error('Error al obtener las ofertas:', err);
        setError('No se pudieron cargar las ofertas. Inténtalo más tarde.');
      }
    };

    fetchOffers(); 
  }, []);

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-center my-6">Ofertas Publicadas</h1>
      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.length > 0 ? (
            offers.map((offer) => (
              <OfferCard
                key={offer._id}
                tittle={offer.tittle}
                description={offer.description}
                company={offer.company || 'Sin especificar'}
                applicants={offer.applicants || []}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">No hay ofertas disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOffersPage;
