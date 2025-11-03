import axios from 'axios';
import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';



const PaginaRegistro = () => {
    // Estado inicial para todos los campos del formulario
    const [datosFormulario, setDatosFormulario] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        birthDate: '',
        department: '',
        municipality: '',
        email: '',
        password: '',
        telephone: '',

    });

    // Estado para manejar municipios dinámicos
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

    // Manejar el cambio en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target; // Desestructurar correctamente e.target

        if (name === 'department') {
            // Actualizar municipios y reiniciar el campo de municipio
            setMunicipios(departamentosYMunicipios[value] || []);
            setDatosFormulario((prevDatos) => ({
                ...prevDatos,
                [name]: value, // Actualiza el departamento seleccionado
                municipality: '', // Reinicia el municipio al cambiar de departamento
            }));
        } else if (name === 'birthDate') {
            // Formatear la fecha si se selecciona el campo de fecha
            const date = new Date(value);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 porque los meses en JavaScript empiezan en 0
            const year = date.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;
            setDatosFormulario((prevDatos) => ({
                ...prevDatos,
                [name]: formattedDate,
            }));
        } else {
            // Actualizar cualquier otro campo
            setDatosFormulario((prevDatos) => ({
                ...prevDatos,
                [name]: value,
            }));
        }
    };


    // Manejar el cambio en el campo de archivo para la foto de perfil
    const handleFileChange = (e) => {
        setDatosFormulario({ ...datosFormulario, fotoPerfil: e.target.files[0] });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

      


        let response = null;
        try {
            response = await axios.post('https://api-grupo-software.onrender.com/api/auth/register-user', JSON.stringify(datosFormulario), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            alert('Usuario registrado correctamente');

        } catch (error) {
            alert(error.response.data.error)
        }



    };


    // Renderiza el componente
    return (
        <div className="max-h-screen w-full mx-auto bg-blue-600 p-6">
            <div>
                <h1 className="text-3xl font-bold text-center text-white mb-6">Registro de usuario</h1>
                <h2 className='text-xl text-center text-white mb-6'>Llena el siguiente formulario para  saber un poco más de ti,
                    y encuentra empleos y pasantias de tu mejor indole. </h2>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Campos del formulario */}

                <input
                    type="text"
                    name="firstName"
                    value={datosFormulario.firstName}
                    onChange={handleChange}
                    placeholder="Nombres"
                    className="bg-black/40 backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white"
                    required
                />
                {/* Repite para apellidos y género */}
                <input
                    type="text"
                    name="lastName"
                    value={datosFormulario.lastName}
                    onChange={handleChange}
                    placeholder="Apellidos"
                    className="bg-black/40  backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white"
                    required
                />
                {/* ... */}
                <input
                    type="tel"
                    name="telephone"
                    value={datosFormulario.telephone}
                    onChange={handleChange}
                    placeholder="Teléfono"
                    className="bg-black/40  backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white"
                    required
                />
                <div>
                    <select
                        id="genero"
                        name="gender"
                        value={datosFormulario.gender}
                        onChange={handleChange}
                        className="bg-black/40 backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white w-full"
                        required
                    >
                        <option value="">Genero</option>

                        <option value="genero1">Femenino</option>
                        <option value="genero2">Masculino</option>
                        {/* ...más opciones... */}
                    </select>
                </div>

                <input
                    type="date"
                    name="birthDate"
                    onFocus={(e) => e.target.type = 'date'}
                    onBlur={(e) => e.target.type = 'text'}
                    placeholder="Fecha de nacimiento"
                    className="bg-black/40 backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white"
                    onChange={handleChange}
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
                            {key.replace("departamento", "Departamento ")}
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

                <input
                    type="email"
                    name="email"
                    value={datosFormulario.correo}
                    onChange={handleChange}
                    placeholder="Correo Electronico"
                    className="bg-black/40 backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white"
                    required
                />

                <div></div>

                <input
                    type="password"
                    name="password"
                    value={datosFormulario.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    className="bg-black/40 backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white"
                    required
                />



                



                {/* Botón de envío */}
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