import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EmpresaOF() {
  const navigate = useNavigate();
  const location = useLocation();
  const ofertaExistente = location.state?.job || null; // Cargar datos de oferta a editar si vienen del estado

  // Estado para el formulario
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    companyName: '',
    description: '',
    esPasantia: false,
  });

  // Si hay una oferta existente, llenamos los datos
  useEffect(() => {
    if (ofertaExistente) {
      setFormData(ofertaExistente);
    }
  }, [ofertaExistente]);

  // Manejador de cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Guardar o actualizar la oferta
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (ofertaExistente) {
        // Actualizar oferta existente
        await axios.put(`/api/empresa/ofertas/${ofertaExistente._id}`, formData);
        alert('Oferta actualizada exitosamente.');
      } else {
        // Crear nueva oferta
        await axios.post('/', formData);
        alert('Oferta creada exitosamente.');
      }
      navigate('/PerfilE'); // Redirigir al perfil de empresa
    } catch (error) {
      console.error('Error al guardar la oferta:', error);
      alert('Ocurrió un error al guardar la oferta.');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg my-6">
      <h2 className="text-2xl font-bold mb-4">
        {ofertaExistente ? 'Editar Oferta' : 'Nueva Oferta'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre de la oferta */}
        <div>
          <label htmlFor="name" className="block text-lg font-semibold">
            Nombre de la Vacante
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej. Desarrollador Frontend"
            required
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* URL de la imagen */}
        <div>
          <label htmlFor="imageUrl" className="block text-lg font-semibold">
            URL de la Imagen
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Ej. https://via.placeholder.com/150"
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Nombre de la empresa */}
        <div>
          <label htmlFor="companyName" className="block text-lg font-semibold">
            Nombre de la Empresa
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Ej. TechCorp"
            required
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description" className="block text-lg font-semibold">
            Descripción de la Vacante
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ej. Desarrollador Frontend con experiencia en React y Node.js..."
            required
            className="w-full border border-gray-300 p-2 rounded-lg h-32"
          />
        </div>

        {/* ¿Es pasantía? */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="esPasantia"
            name="esPasantia"
            checked={formData.esPasantia}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="esPasantia" className="text-lg font-semibold">
            ¿Es una Pasantía?
          </label>
        </div>

        {/* Botones */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full transition duration-300"
          >
            {ofertaExistente ? 'Guardar Cambios' : 'Crear Oferta'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/PerfilE')}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-full transition duration-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
