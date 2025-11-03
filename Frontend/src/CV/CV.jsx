import React, { useState } from "react";
import axios from "axios";

const CV = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    genero: "",
    fechaNacimiento: "",
    departamento: "",
    calleColonia: "",
    numeroContacto1: "",
    numeroContacto2: "",
    correoElectronico: "",
    expectativaLaboral: "",
    educacionInicial: "",
    educacionMedia: "",
    educacionSuperior: "",
    habilidades: "",
    competencias: "",
    servicio: "",
    archivo: null, // Para manejar el archivo cargado
  });

  const [cvGuardado, setCvGuardado] = useState(false); // Estado para saber si hay un CV guardado

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar cambio en el archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, archivo: file });
  };

  // Función para guardar el CV
  const guardarCV = async () => {
    try {
      const token = localStorage.getItem("token"); // Agrega autenticación si es necesario
      const formDataToSend = new FormData();

      // Agregar datos al FormData
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axios.post("https://api-grupo-software.onrender.com/api/cv/", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("CV guardado con éxito:", response.data);
      setCvGuardado(true); // Actualizamos el estado para indicar que el CV está guardado
    } catch (error) {
      console.error("Error al guardar el CV:", error);
    }
  };

  // Función para actualizar el CV
  const actualizarCV = async () => {
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();

      // Agregar datos al FormData
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await axios.put("https://api-grupo-software.onrender.com/api/cv/", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("CV actualizado con éxito:", response.data);
    } catch (error) {
      console.error("Error al actualizar el CV:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-gradient-to-b from-blue-500 to-blue-300 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-white text-center text-3xl font-bold mb-6">CV Virtual</h2>
          <p className="text-white text-center mb-8">
            Completa este CV con tu información personal y laboral para hacer más fácil tu
            búsqueda laboral.
          </p>

          <form className="bg-blue-100 shadow-xl rounded-lg p-6 space-y-8">
            {/* Información Personal */}
            <section>
              <h3 className="text-blue-700 font-bold text-xl mb-4">Información Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Apellido"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Género</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  placeholder="Departamento"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="calleColonia"
                  value={formData.calleColonia}
                  onChange={handleChange}
                  placeholder="Calle o Colonia"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="numeroContacto1"
                  value={formData.numeroContacto1}
                  onChange={handleChange}
                  placeholder="Número de Contacto 1"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="numeroContacto2"
                  value={formData.numeroContacto2}
                  onChange={handleChange}
                  placeholder="Número de Contacto 2"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="correoElectronico"
                  value={formData.correoElectronico}
                  onChange={handleChange}
                  placeholder="Correo Electrónico"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </section>

            {/* Información Laboral */}
            <section>
              <h3 className="text-blue-700 font-bold text-xl mb-4">Información Laboral</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="expectativaLaboral"
                  value={formData.expectativaLaboral}
                  onChange={handleChange}
                  placeholder="Expectativa Laboral"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="educacionInicial"
                  value={formData.educacionInicial}
                  onChange={handleChange}
                  placeholder="Educación Inicial"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="educacionMedia"
                  value={formData.educacionMedia}
                  onChange={handleChange}
                  placeholder="Educación Media"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="educacionSuperior"
                  value={formData.educacionSuperior}
                  onChange={handleChange}
                  placeholder="Educación Superior"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </section>

            {/* Habilidades y Competencias */}
            <section>
              <h3 className="text-blue-700 font-bold text-xl mb-4">Habilidades y Competencias</h3>
              <textarea
                name="habilidades"
                value={formData.habilidades}
                onChange={handleChange}
                placeholder="Describe tus habilidades"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
              <textarea
                name="competencias"
                value={formData.competencias}
                onChange={handleChange}
                placeholder="Describe tus competencias"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
            </section>

            {/* Select de Servicio y Archivo */}
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
              <select
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Servicio</option>
                <option value="Profesional">Profesional</option>
                <option value="Estudiante">Estudiante</option>
              </select>
              <input
                type="file"
                name="archivo"
                onChange={handleFileChange}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="image/*"
              />
              {!cvGuardado ? (
                <button
                  onClick={guardarCV}
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Guardar CV
                </button>
              ) : (
                <button
                  onClick={actualizarCV}
                  className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  Actualizar CV
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CV;
