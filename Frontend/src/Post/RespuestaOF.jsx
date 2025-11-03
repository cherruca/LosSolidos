import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaginaRespuestas = () => {
    const [respuestas, setRespuestas] = useState([]);

    // ** Fetch de las respuestas desde la API (comentada por ahora) **
    useEffect(() => {
        const fetchRespuestas = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setRespuestas(response.data);
            } catch (error) {
                console.error('Error al obtener las respuestas:', error);
            }
        };

        fetchRespuestas();
    }, []);

    // ** Datos ficticios para pruebas locales (comentada) **
    /*
    const respuestasFicticias = [
        {
            id: "1",
            nombreCandidato: "Juan Pérez",
            ofertaTitulo: "Desarrollador Frontend",
            mensaje: "Estoy interesado en esta posición, adjunto mi CV.",
            estado: "En revisión",
        },
        {
            id: "2",
            nombreCandidato: "María García",
            ofertaTitulo: "Analista de Datos",
            mensaje: "Me interesa esta vacante, espero su respuesta.",
            estado: "Aceptada",
        },
        {
            id: "3",
            nombreCandidato: "Carlos López",
            ofertaTitulo: "Desarrollador Backend",
            mensaje: "Gracias por la oportunidad, estoy disponible para una entrevista.",
            estado: "Rechazada",
        },
    ];

    // Simulación de retraso como si fuera una llamada a una API
    useEffect(() => {
        setTimeout(() => {
            setRespuestas(respuestasFicticias);
        }, 1000);
    }, []);
    */

    return (
        <div className="min-h-screen w-full mx-auto bg-blue-600 p-6">
            <h1 className="text-3xl font-bold text-center text-white mb-6">Respuestas a tus Ofertas</h1>

            {/* Mostrar las respuestas en una tabla */}
            <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">Candidato</th>
                            <th className="px-4 py-2 text-left">Oferta</th>
                            <th className="px-4 py-2 text-left">Mensaje</th>
                            <th className="px-4 py-2 text-left">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {respuestas.length > 0 ? (
                            respuestas.map((respuesta) => (
                                <tr key={respuesta.id}>
                                    <td className="px-4 py-2 border">{respuesta.nombreCandidato}</td>
                                    <td className="px-4 py-2 border">{respuesta.ofertaTitulo}</td>
                                    <td className="px-4 py-2 border">{respuesta.mensaje}</td>
                                    <td className="px-4 py-2 border">{respuesta.estado}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-2 text-center">No hay respuestas aún.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaginaRespuestas;
