import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/pasantia.png';

const Ayuda = () => {
    const [openSection, setOpenSection] = useState(null);

    const servicios = {
        'Crear perfil': {
            descripcion: 'Información detallada sobre cómo crear tu perfil.',
            url: '/Registro'
        },
        'Trabajos': {
            descripcion: 'Descubre cómo buscar y aplicar a ofertas de trabajo.',
            url: '/Trabajos'
        },
        'Mi perfil': {
            descripcion: 'Aprende a gestionar y actualizar tu perfil.',
            url: '/PerfilU'
        },
        'Crear oferta': {
            descripcion: 'Información para empresas sobre cómo publicar nuevas ofertas de trabajo.',
            url: '/PerfilE'
        }
    };

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="container mx-auto p-4">
            {/* Sección de bienvenida con imagen de fondo y superposición */}
            <div
                className="text-center p-20 lg:p-24 xl:p-32 2xl:p-40 rounded-lg shadow-md relative"
                style={{
                    color: 'white',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    overflow: 'hidden'
                }}
            >
                {/* Superposición sobre la imagen de fondo */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                {/* Contenido de texto */}
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold">¡ÚNETE A NUESTRO EQUIPO!</h1>
                    <p className="mt-4 text-xl">Haz parte de una compañía sólida, con una amplia trayectoria en donde nuestra mayor satisfacción es transformar y mejorar la experiencia de nuestros clientes.</p>
                </div>
            </div>

            {/* Sección de ayuda y servicios frecuentes */}
            <div className="flex flex-wrap justify-between mt-8">
                {/* Sección de ayuda */}
                <div className="w-full md:w-1/2 p-4">
                    <h3 className="text-xl font-bold" style={{ color: '#005792' }}>¿Necesitas ayuda?</h3>
                    <p className="mt-2" style={{ color: '#005792' }}>
                        Estamos aquí para ayudarte en cada paso de tu experiencia en nuestra plataforma. Si tienes preguntas sobre cómo crear o mejorar tu perfil, cómo buscar oportunidades laborales, cómo publicar ofertas o cualquier otra consulta, estás en el lugar adecuado. Acá te proporcionamos respuestas rápidas y soluciones efectivas. ¡Tu éxito es nuestra prioridad, y estamos comprometidos a ayudarte a alcanzar tus metas profesionales en PROFESSIONNET!
                    </p>
                </div>

                {/* Sección de servicios frecuentes */}
                <div className="w-full md:w-1/2 p-4">
                    <div className="p-6 rounded-lg shadow-md bg-gradient-to-r from-blue-800 to-blue-500">
                        <h3 className="text-xl font-bold text-white mb-4">Servicios frecuentes</h3>
                        {Object.entries(servicios).map(([service, { descripcion, url }]) => (
                            <div key={service} className="mb-4">
                                <button
                                    className="flex justify-between items-center w-full text-left text-white py-2"
                                    onClick={() => toggleSection(service)}
                                >
                                    {service}
                                    <span className="text-2xl">{openSection === service ? '−' : '→'}</span>
                                </button>
                                {openSection === service && (
                                    <div className="text-white py-2">
                                        <p>{descripcion}</p>
                                        <Link to={url} className="text-blue-200 hover:text-blue-100">
                                            Más información
                                        </Link>
                                    </div>
                                )}
                                <div className="border-t border-white"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ayuda;
