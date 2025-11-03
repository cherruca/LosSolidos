import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PerfilUsuario() {
  const [perfil, setPerfil] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    department: "",
    telephone: "",
    email: "",
    description: "",
    image: null, // Para almacenar la imagen
    imagePreview: null, // Para previsualizar la imagen
  });
  const [isSaved, setIsSaved] = useState(false); // Determina si ya hay un perfil guardado
  const [loading, setLoading] = useState(true);

  // Obtener datos del perfil al cargar
  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        const response = await axios.get("https://api-grupo-software.onrender.com/api/vacant/work", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data) {
          setPerfil({
            ...response.data,
            imagePreview: response.data.image || null, // Configura la previsualización si ya existe una imagen
          });
          setIsSaved(true); // Perfil ya guardado
        }
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerDatosUsuario();
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil({ ...perfil, [name]: value });
  };

  // Manejar cambio en el input de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPerfil({
      ...perfil,
      image: file,
      imagePreview: file ? URL.createObjectURL(file) : perfil.imagePreview, // Previsualizar la imagen seleccionada
    });
  };

  // Guardar perfil
  const guardarPerfil = async () => {
    const formData = new FormData();
    Object.keys(perfil).forEach((key) => {
      if (perfil[key]) formData.append(key, perfil[key]);
    });

    try {
      const response = await axios.post("http://localhost:3000/api/vacant/work", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Perfil guardado:", response.data);
      setIsSaved(true); // Actualizar estado de guardado
      alert("Perfil guardado exitosamente.");
    } catch (error) {
      console.error("Error al guardar el perfil:", error);
      alert("Hubo un error al guardar el perfil.");
    }
  };

  // Actualizar perfil
  const actualizarPerfil = async () => {
    const formData = new FormData();
    Object.keys(perfil).forEach((key) => {
      if (perfil[key]) formData.append(key, perfil[key]);
    });

    try {
      const response = await axios.put("http://localhost:3000/api/vacant/work", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Perfil actualizado:", response.data);
      alert("Perfil actualizado exitosamente.");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("Hubo un error al actualizar el perfil.");
    }
  };

  if (loading) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gradient-to-b from-blue-800 to-teal-500 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white text-center mb-6">PERFIL</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna de Datos Generales */}
        <div className="bg-blue-600 p-6 rounded-lg text-white">
          <h3 className="text-xl font-bold mb-4">DATOS GENERALES</h3>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold">Nombres:</label>
              <input
                type="text"
                name="firstName"
                value={perfil.firstName}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-black"
              />
            </div>
            <div>
              <label className="block font-semibold">Apellidos:</label>
              <input
                type="text"
                name="lastName"
                value={perfil.lastName}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-black"
              />
            </div>
            <div>
              <label className="block font-semibold">Fecha de Nacimiento:</label>
              <input
                type="date"
                name="birthDate"
                value={perfil.birthDate}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-black"
              />
            </div>
            <div>
              <label className="block font-semibold">Teléfono:</label>
              <input
                type="text"
                name="telephone"
                value={perfil.telephone}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-black"
              />
            </div>
            <div>
              <label className="block font-semibold">Correo:</label>
              <input
                type="email"
                name="email"
                value={perfil.email}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-black"
              />
            </div>
            <div>
              <label className="block font-semibold">Departamento:</label>
              <input
                type="text"
                name="department"
                value={perfil.department}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-black"
              />
            </div>
          </div>
        </div>

        {/* Imagen y Descripción */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4 text-blue-600">IMAGEN</h3>
          <div className="mb-4 text-center">
            {perfil.imagePreview ? (
              <img
                src={perfil.imagePreview}
                alt="Imagen seleccionada"
                className="w-full h-48 object-contain rounded-lg mb-4" // Cambia "object-cover" a "object-contain" si no quieres que se recorte
              />
            ) : (
              <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-600 rounded-lg mb-4">
                Sin imagen seleccionada
              </div>
            )}
            <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition">
              Seleccionar Imagen
            </label>
            <input
              id="file-upload"
              type="file"
              name="image"
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>
          <h3 className="text-xl font-bold mb-4 text-blue-600">DESCRIPCIÓN</h3>
          <textarea
            name="description"
            value={perfil.description}
            onChange={handleChange}
            rows="6"
            className="w-full p-3 border rounded bg-gray-100 text-black"
            placeholder="Describe tu perfil profesional..."
          ></textarea>
        </div>

      </div>

      {/* Botones de Guardar/Actualizar */}
      <div className="mt-6 text-center">
        {!isSaved ? (
          <button
            onClick={guardarPerfil}
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition"
          >
            Guardar Perfil
          </button>
        ) : (
          <button
            onClick={actualizarPerfil}
            className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition"
          >
            Actualizar Perfil
          </button>
        )}
      </div>
    </div>
  );
}
