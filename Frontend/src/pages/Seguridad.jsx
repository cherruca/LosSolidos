import React from 'react';

// Importa las imágenes que necesitas
import SP1 from '../assets/SP1.png';
import SP2 from '../assets/SP2.png';
import SP3 from '../assets/SP3.png';
import SP4 from '../assets/SP4.png';

import SE1 from '../assets/SE1.png';
import SE2 from '../assets/SE2.png';
import SE3 from '../assets/SE3.png';
import SE4 from '../assets/SE4.png';

const SeguridadPage = () => {
  return (
    <div className="bg-blue-300 text-white py-8 px-4">
      <div className="container mx-auto">
        {/* Sección de Innovación */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold mb-4">INNOVACIÓN</h2>
          <p className="text-3xl mb-10">
          En PROFESSIONNET, nos enorgullece impulsar la innovación en el mundo de la búsqueda de empleo y oportunidades de pasantías. Nuestra plataforma utiliza tecnología de vanguardia para revolucionar la forma en que los profesionales se conectan con oportunidades laborales y cómo las empresas encuentran talento. Estamos comprometidos con la continua mejora y evolución de nuestra plataforma para asegurarnos de que nuestros usuarios tengan acceso a las últimas herramientas y características.
            {/* Completa con tu texto */}
          </p>
        </div>


        {/* Sección Características */}
        <section className="container mx-auto p-20 bg-blue-900">
  <div className="grid grid-cols-4 gap-4 text-center">
    {/* Empleos personalizados */}
    <div className="flex flex-col items-center">
      <img src={SP1} alt="Empleos" className="w-20 h-20 mx-auto" />
      <p className="text-white font-semibold mt-2 text-2xl">Contraseñas seguras</p>
    </div>
    {/* Servicios innovadores */}
    <div className="flex flex-col items-center">
      <img src={SP2} alt="Servicios" className="w-20 h-20 mx-auto" />
      <p className="text-white font-semibold mt-2 text-2xl">Configuracion de privacidad</p>
    </div>
    {/* Búsqueda con la mejor experiencia */}
    <div className="flex flex-col items-center">
      <img src={SP3} alt="Experiencia" className="w-20 h-20 mx-auto" />
      <p className="text-white font-semibold mt-2 text-2xl">Reportar comportamientos sospechosos</p>
    </div>
    {/* Cuarto elemento */}
    <div className="flex flex-col items-center">
      <img src={SP4} alt="Innovación" className="w-20 h-20 mx-auto" />
      <p className="text-white font-semibold mt-2 text-2xl">Proteccion de datos personales</p>
    </div>
    </div>
                    {/* Línea Azul y Texto */}
                    <div className="w-full my-4 border-t-4 border-blue-300"></div>
                    <div className="text-center">
                    </div>
                </section>


                <section className="container mx-auto p-20 bg-white ">
  <div className="grid grid-cols-4 gap-4 text-center">
    {/* Empleos personalizados */}
    <div className="flex flex-col items-center">
      <img src={SE1} alt="Empleos" className="w-20 h-20 mx-auto" />
      <p className="text-blue-600 font-semibold mt-2 text-2xl">Transparencia en las ofertas</p>
    </div>
    {/* Servicios innovadores */}
    <div className="flex flex-col items-center">
      <img src={SE2} alt="Servicios" className="w-20 h-20 mx-auto" />
      <p className="text-blue-600 font-semibold mt-2 text-2xl">Cumplimiento legal y etico</p>
    </div>
    {/* Búsqueda con la mejor experiencia */}
    <div className="flex flex-col items-center">
      <img src={SE3} alt="Experiencia" className="w-20 h-20 mx-auto" />
      <p className="text-blue-600 font-semibold mt-2 text-2xl">Seguridad de la informacion</p>
    </div>
    {/* Cuarto elemento */}
    <div className="flex flex-col items-center">
      <img src={SE4} alt="Innovación" className="w-20 h-20 mx-auto" />
      <p className="text-blue-600 font-semibold mt-2 text-2xl">RUC</p>
    </div>
    </div>
                    {/* Línea Azul y Texto */}
                    <div className="w-full my-4 border-t-4 border-blue-300"></div>
                    <div className="text-center">
                    </div>
                </section>

        {/* Añade más secciones según sea necesario */}
      </div>
    </div>
  );
};

export default SeguridadPage;