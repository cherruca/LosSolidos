import axios from 'axios';
import React, { useState } from 'react';

const PaginaRegistro = () => {
    const [datosFormulario, setDatosFormulario] = useState({
        companyName: '',
        email: '',
        telephone: '',
        password: '',
        department: '',
        municipality: '',
        description: '',
    });

    const [municipios, setMunicipios] = useState([]);

    // Relación de departamentos con municipios
    const departamentosYMunicipios = {
        "Santa Ana": ["Santa Ana", "Candelaria de la Frontera", "Chalchuapa", "Coatepeque", "El Congo", "Texistepeque"],
        "Ahuachapán": ["Ahuachapán", "Apaneca", "Atiquizaya", "Concepción de Ataco", "El Refugio", "San Lorenzo"],
        "Sonsonate": ["Sonsonate", "Armenia", "Juayúa", "Nahuizalco", "Nahulingo", "Salcoatitán"],
        "Chalatenango": ["Chalatenango", "Arcatao", "Citalá", "Nueva Concepción", "San Ignacio", "Tejutla"],
        "La Libertad": ["La Libertad", "Santa Tecla", "Antiguo Cuscatlán", "Colón", "San José Villanueva", "Zaragoza"],
        "San Salvador": ["San Salvador", "Apopa", "Ayutuxtepeque", "Cuscatancingo", "Ilopango", "Soyapango"],
        "Cuscatlán": ["Cuscatlán", "Cojutepeque", "Suchitoto", "San José Guayabal", "San Pedro Perulapán", "Tenancingo"],
        "Cabañas": ["Cabañas", "Ilobasco", "Sensuntepeque", "Victoria", "Guacotecti", "San Isidro"],
        "La Paz": ["La Paz", "Zacatecoluca", "Olocuilta", "San Luis Talpa", "San Pedro Masahuat", "Tapalhuaca"],
        "San Vicente": ["San Vicente", "Apastepeque", "Tecoluca", "San Sebastián", "Santa Clara", "Santo Domingo"],
        "Usulután": ["Usulután", "Alegría", "Berlín", "Santa Elena", "San Francisco Javier", "Jucuapa"],
        "San Miguel": ["San Miguel", "Ciudad Barrios", "Chinameca", "Moncagua", "San Rafael Oriente", "Uluazapa"],
        "Morazán": ["Morazán", "San Francisco Gotera", "Perquín", "Joateca", "Meanguera", "Sociedad"],
        "La Unión": ["La Unión", "Conchagua", "Santa Rosa de Lima", "Pasaquina", "San Alejo", "El Sauce"],
    };

    
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'department') {
           
            setMunicipios(departamentosYMunicipios[value] || []);
            setDatosFormulario((prevDatos) => ({
                ...prevDatos,
                [name]: value, 
                municipality: '', 
            }));
        } else {
            
            setDatosFormulario((prevDatos) => ({
                ...prevDatos,
                [name]: value,
            }));
        }
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const response = await axios.post(
                'https://api-grupo-software.onrender.com/api/auth/register-company',
                JSON.stringify(datosFormulario),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            alert('Registro exitoso');
            console.log(response.data); // Muestra la respuesta del backend en la consola
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert('Error al registrar la empresa');
        }
    };

    // Renderizar el formulario
    return (
        <div className="max-h-screen w-full mx-auto bg-blue-600 p-6">
            <div>
                <h1 className="text-3xl font-bold text-center text-white mb-6">Registro de Empresa</h1>
                <h2 className="text-xl text-center text-white mb-6">
                    Llena el formulario para registrar tu empresa y conectar con oportunidades.
                </h2>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input
                    type="text"
                    name="companyName"
                    value={datosFormulario.companyName}
                    onChange={handleChange}
                    placeholder="Nombre de la empresa"
                    className="bg-black/40 backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={datosFormulario.email}
                    onChange={handleChange}
                    placeholder="Correo Electrónico"
                    className="bg-black/40 backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white"
                    required
                />
                <input
                    type="tel"
                    name="telephone"
                    value={datosFormulario.telephone}
                    onChange={handleChange}
                    placeholder="Teléfono"
                    className="bg-black/40 backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={datosFormulario.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    className="bg-black/40 backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white"
                    required
                />
                <select
                    name="department"
                    value={datosFormulario.department}
                    onChange={handleChange}
                    className="bg-black/40 p-2 rounded border border-white/40 text-white"
                    required
                >
                    <option value="">Seleccione un Departamento</option>
                    {Object.keys(departamentosYMunicipios).map((key) => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </select>
                <select
                    name="municipality"
                    value={datosFormulario.municipality}
                    onChange={handleChange}
                    className="bg-black/40 p-2 rounded border border-white/40 text-white"
                    required
                >
                    <option value="">Seleccione un Municipio</option>
                    {municipios.map((municipio, index) => (
                        <option key={index} value={municipio}>
                            {municipio}
                        </option>
                    ))}
                </select>
                <textarea
                    name="description"
                    value={datosFormulario.description}
                    onChange={handleChange}
                    placeholder="Descripción de la empresa"
                    className="bg-black/40 backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white col-span-1 md:col-span-3"
                ></textarea>
                <div className="md:col-span-3 flex justify-center my-3">
                    <button className="bg-white text-blue-500 py-2 px-40 rounded-full">
                        Registrarse
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaginaRegistro;
