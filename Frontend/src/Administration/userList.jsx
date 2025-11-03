import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserCard = ({ firstName, lastName, email, telephone, birthDate, department, municipality, gender }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h3 className="text-lg font-bold">{firstName} {lastName}</h3>
    <p className="text-gray-800"><strong>Email:</strong> {email}</p>
    <p className="text-gray-800"><strong>Teléfono:</strong> {telephone}</p>
    <p className="text-gray-800"><strong>Fecha de Nacimiento:</strong> {new Date(birthDate).toLocaleDateString()}</p>
    <p className="text-gray-800"><strong>Departamento:</strong> {department}</p>
    <p className="text-gray-800"><strong>Municipio:</strong> {municipality}</p>
    <p className="text-gray-800"><strong>Género:</strong> {gender}</p>
  </div>
);

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Obtener el token de autenticación desde localStorage
        const token = localStorage.getItem('token');

        // Realizar la solicitud a la API
        const response = await axios.get('https://api-grupo-software.onrender.com/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Actualizar el estado con los usuarios obtenidos
        setUsers(response.data); // Nota: `response.data` ya es un arreglo en tu caso
      } catch (err) {
        console.error('Error al obtener los usuarios:', err);
        setError('No se pudieron cargar los usuarios. Inténtalo más tarde.');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-center my-6">Usuarios Registrados</h1>
      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard key={user._id} {...user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
