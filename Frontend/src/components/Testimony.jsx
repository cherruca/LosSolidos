import React from "react";

const testimony1 = [
    {
        id: 1,
        text: "La plataforma de empleos ha sido una herramienta increíble para encontrar oportunidades laborales. Como estudiante, me ha ayudado a conectarme con empresas que buscan pasantes, y lo mejor es que todo el proceso es muy fácil de seguir. Además, la sección de 'ofertas de trabajo' tiene filtros muy útiles que me permiten encontrar solo las opciones que se ajustan a mi perfil. ¡Definitivamente la recomendaría a todos los que busquen dar un paso más en su carrera!",
        name: "María Fernández"
    }
];

const testimony2 = [
    {
        id: 2,
        text: "Gracias a la plataforma de empleos, pude encontrar el trabajo de mis sueños. Estaba buscando una empresa que me permitiera crecer profesionalmente y que me ofreciera un ambiente de trabajo agradable, y lo encontré. La sección de 'ofertas de trabajo' es muy completa y tiene opciones para todos los perfiles. Además, el proceso de aplicación es muy sencillo y rápido. ¡Estoy muy contento con los resultados!",
        name: "Juan Pérez"
    }
];

const Testimony = ({ number }) => {
    const testimony = number === 1 ? testimony1 : testimony2;

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex flex-col justify-center items-center ">
            <h2 className="text-3xl font-semibold text-center mb-8">Testimonios</h2>
            <div className="space-y-6 max-w-lg">
                {testimony.map((testimony) => (
                    <div key={testimony.id} className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-gray-600">{testimony.text}</p>
                        <div className="mt-4 text-right">
                        <p className="font-bold text-gray-800">{testimony.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimony;