import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Listas de opciones
const habilidadesLista = [
  'Trabajo en equipo',
  'Comunicación efectiva',
  'Resolución de problemas',
  'Pensamiento crítico',
  'Gestión del tiempo',
  'Creatividad',
  'Adaptabilidad',
  'Liderazgo'
];
const competenciasLista = [
  'Importancia de imagen',
  'Motivación',
  'Iniciativa propia',
  'Gestión de Proyectos',
  'Pensamiento Estrategico',
  'Capacidad Analitica',
  'Inteligenica Emocional',
  'Negociación'
];
const caracteristicasLista = [
  'Inteligenica social',
  'Colaborador/a',
  'Autoregulación',
  'Búsqueda del exito',
  'Asunción de riesgos',
  'Integridad',
  'Confianza',
  'Imparcialidad'
];

const PaginaRegistro = () => {
  const [datosFormulario, setDatosFormulario] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: '',
    department: '',
    municipality: '',
    password: '',
    telephone: '',
    experience: [{
      description: '',
      start: '',
      end: '',
    }],
    habilities: [],
    competences: [],
    caracteristics: []
  });
  const [id, setId] = useState('');

  // Navegación con react-router
  const navigate = useNavigate();

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosFormulario(prevState => ({
      ...prevState,
      [name]: value
    }));

  };

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuesta = await axios.get("https://api-grupo-software.onrender.com/api/auth/whoami", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        // console.log(respuesta.data._id);
        setId(respuesta.data._id);
      } catch (error) {
        console.error('Hubo un error al obtener los datos del usuario:', error);
      }
    }
    obtenerDatos();
  }, []);


  const handleExperienceChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExperiences = datosFormulario.experience.map((item, idx) => {
      if (idx === index) {
        return { ...item, [name]: value };
      }
      return item;
    });

    setDatosFormulario(prevState => ({
      ...prevState,
      experience: updatedExperiences
    }));
  };

  // Maneja los cambios en los checkboxes
  const handleCheckboxChange = (name, value) => {
    setDatosFormulario(prevState => {
      // Verifica si el valor ya está presente en el array
      const currentIndex = prevState[name].indexOf(value);
      const newChecked = [...prevState[name]];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      return {
        ...prevState,
        [name]: newChecked.slice(0, 3) // Asegura que solo hay hasta 3 seleccionados
      };
    });
  };

  // Maneja la adición de experiencias laborales
  const handleAddExperience = () => {
    setDatosFormulario(prevState => ({
      ...prevState,
      experience: [
        ...prevState.experience,
        {description: '', start: '', end: '' },
      ]
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      console.log(datosFormulario);
      const respuesta = await axios.patch(`https://api-grupo-software.onrender.com/api/auth/edit-user-profile/${id}`, datosFormulario, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(respuesta);
      alert("Usuario actualizado correctamente")

      // navigate('/');
      
    } catch (error) {
      alert(error.response.data.message)
    }

  };

  // Renderiza el componente
  return (
    <div className="min-h-screen w-full mx-auto bg-blue-600 p-6">
      <h1 className="text-3xl font-bold text-center text-white mb-6">Registro de usuario</h1>
      <h3 className="text-2xl font-bold text-center text-white mb-6">Información Personal</h3>
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
        {/* Repite para apellido y género */}
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
        <div>
          <select
            id="gender"
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
          type="text"
          name="birthDate"
          onFocus={(e) => e.target.type = 'date'}
          onBlur={(e) => e.target.type = 'text'}
          placeholder="Fecha de nacimiento"
          className="bg-black/40 backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white"
          onChange={handleChange}
          required
        />



        <div>
          <select
            id="department"
            name="department"
            value={datosFormulario.department}
            onChange={handleChange}
            className="bg-black/40 backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white w-full"
            required
          >
            <option value="">Departamento</option>
            {/* Opciones de servicios */}
            <option value="departamento1">Santa Ana</option>
            <option value="departamento2">Ahuachapán</option>
            <option value="departamento3">Sonsonate</option>
            <option value="departamento4">Chalatenango</option>
            <option value="departamento5">La Libertad</option>
            <option value="departamento6">San Salvador</option>
            <option value="departamento7">Cuscatlán</option>
            <option value="departamento8">Cabañas</option>
            <option value="departamento9">La Paz</option>
            <option value="departamento10">San Vicente</option>
            <option value="departamento11">Usulután</option>
            <option value="departamento12">San Miguel</option>
            <option value="departamento13">Morazán</option>
            <option value="departamento14">La Unión</option>
          </select>
        </div>


        <input
          type="text"
          name="municipality"
          value={datosFormulario.municipality}
          onChange={handleChange}
          placeholder="Dirección"
          className="bg-black/40  backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white"
          required
        />

        <input
          type="text"
          name="telephone"
          value={datosFormulario.telephone}
          onChange={handleChange}
          placeholder="Número de Contacto"
          className="bg-black/40 backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white"
          pattern="\d*"
          title="Por favor, ingrese solo números."
          required
        />

        <div>
        </div>


        <input
          type="password"
          name="password"
          value={datosFormulario.password}
          onChange={handleChange}
          placeholder="Contraseña"
          className="bg-black/40 backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white"
          required
        />



        <div></div>

        <h1 className="text-3xl font-bold text-center text-white mb-6">Información Laboral</h1>
        <div>
        </div>
        <div>
        </div>
        <h3 className="text-2xl font-bold text-center text-white mb-6">Experiencia Laboral</h3>
        <div>
        </div>

        {datosFormulario.experience.map((experience, index) => (
          <React.Fragment key={index}>

            <input
              type="text"
              name="description"
              value={experience.description}
              onChange={(e) => handleExperienceChange(e, index)}
              placeholder="Cargo o puesto desempeñado"
              className="bg-black/40 backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white"
              required
            />
            <input
              type="text"
              name="start"
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => e.target.type = 'text'}
              value={experience.start}
              onChange={(e) => handleExperienceChange(e, index)}
              placeholder="Fecha de Inicio"
              className="bg-black/40 backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white"
              required
            />

            <input
              type="text"
              name="end"
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => e.target.type = 'text'}
              value={experience.end}
              onChange={(e) => handleExperienceChange(e, index)}
              placeholder="Fecha de Conclusión"
              className="bg-black/40 backdrop-blur-sm p-2 rounded border border-white/40 placeholder-white/70 text-white"
              required
            />
          </React.Fragment>
        ))}
        <div className='md:col-span-3 flex justify-center'>
          <button type="button" onClick={handleAddExperience} className="bg-white text-blue-500 py-2 px-40 rounded-full">
            Agregar otra empresa
          </button>
        </div>

        <div></div>






        <div className="container mx-auto px-4 py-8 w-full">
          <h3 className="text-xl font-bold text-white mb-4 text-center">Habilidades (Selecciona hasta 3)</h3>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {habilidadesLista.map((habilidad, index) => (
              <label key={index} className="flex items-center w-full md:w-auto">
                <input
                  type="checkbox"
                  checked={datosFormulario.habilities.includes(habilidad)}
                  onChange={() => handleCheckboxChange('habilities', habilidad)}
                  className="form-checkbox rounded text-blue-600 mr-2"
                />
                <span className="text-white">{habilidad}</span>
              </label>
            ))}
          </div>
        </div>

        <div></div>
        <div></div>

        <div className="container mx-auto px-4 py-8 w-full">
          <h3 className="text-xl font-bold text-white mb-4 text-center">Competencia (Selecciona hasta 3)</h3>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {competenciasLista.map((competencias, index) => (
              <label key={index} className="flex items-center w-full md:w-auto">
                <input
                  type="checkbox"
                  checked={datosFormulario.competences.includes(competencias)}
                  onChange={() => handleCheckboxChange('competences', competencias)}
                  className="form-checkbox rounded text-blue-600 mr-2"
                />
                <span className="text-white">{competencias}</span>
              </label>
            ))}
          </div>
        </div>

        <div></div>
        <div></div>


        <div className="container mx-auto px-4 py-8 w-full">
          <h3 className="text-xl font-bold text-white mb-4 text-center">Características (Selecciona hasta 3)</h3>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {caracteristicasLista.map((caracteristicas, index) => (
              <label key={index} className="flex items-center w-full md:w-auto">
                <input
                  type="checkbox"
                  checked={datosFormulario.caracteristics.includes(caracteristicas)}
                  onChange={() => handleCheckboxChange('caracteristics', caracteristicas)}
                  className="form-checkbox rounded text-blue-600 mr-2"
                />
                <span className="text-white">{caracteristicas}</span>
              </label>
            ))}
          </div>
        </div>


        {/* Botón de envío */}
        <div className="md:col-span-3 flex justify-center">
          <button className="bg-white text-blue-500 py-2 px-40 rounded-full">
            Subir CV Virtual
          </button>
        </div>

      </form>
    </div>
  );
};

export default PaginaRegistro