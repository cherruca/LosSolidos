import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Banner from '../assets/Banner.png';
import Banner2 from '../assets/banner_2.svg';
import Banner3 from '../assets/banner_3.svg';  
import Empleados from '../assets/empleos.png';
import Servicios from '../assets/servicios.png';
import Experiencia from '../assets/experiencia.png';

import Trabajos from '../assets/trabajo.png';
import Pasantias from '../assets/pasantia.png';
import Datos from '../assets/datos.png';
import Ayuda from '../assets/ayuda.png';
import Innovacion from '../assets/innovacion.png';

import Testimonio1 from '../assets/testimonio1.png';
import Testimonio3 from '../assets/testimonio3.png';

import LogoDynatrace from '../assets/dyntrace.svg';
import LogoOracle from '../assets/oracle.svg';
import LogoVmware from '../assets/vmware.svg';


import { useNavigate } from 'react-router-dom';



const NewPage = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
    };

    const navigate = useNavigate(); // navegación

    const cards = [
        { image: Trabajos, title: 'Trabajos', bgColor: 'bg-blue-600', path: '/trabajos' },
        { image: Pasantias, title: 'Pasantías', bgColor: 'bg-green-600', path: '/pasantias' },
        { image: Datos, title: 'Empresas', bgColor: 'bg-teal-600', path: '/empresas' },
        { image: Ayuda, title: 'Ayuda', bgColor: 'bg-indigo-600', path: '/ayuda' },
        { image: Innovacion, title: 'Innovación y Seguridad', bgColor: 'bg-purple-600', path: '/Seguridad' },
    ];

    

    return (
        <div className="new-page-container overflow-x-hidden">
            <main>
                
                <section className="relative bg-blue-500 text-white">
                    <Slider {...settings} className="overflow-hidden">
                        <div>
                            <img src={Banner} alt="Banner 1" className="w-full h-auto" />
                        </div>
                        <div>
                            <img src={Banner2} alt="Banner 2" className="w-full h-auto object-cover" />
                        </div>
                        <div>
                            <img src={Banner3} alt="Banner 3" className="w-full h-auto object-cover" />
                        </div>
                    </Slider>
                </section>

                
                <section className="container mx-auto p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="flex flex-col items-center">
                            <img src={Empleados} alt="Empleos" className="w-12 h-12 mx-auto" />
                            <p className="text-blue-600 font-semibold mt-2">Empleos personalizados</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={Servicios} alt="Servicios" className="w-12 h-12 mx-auto" />
                            <p className="text-blue-600 font-semibold mt-2">Servicios innovadores</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={Experiencia} alt="Experiencia" className="w-12 h-12 mx-auto" />
                            <p className="text-blue-600 font-semibold mt-2">Búsqueda con la mejor experiencia</p>
                        </div>
                    </div>
                    <div className="w-full my-4 border-t-4 border-blue-600"></div>
                </section>

                

                <section className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center p-4">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(card.path)} 
                            className={`${card.bgColor} relative cursor-pointer transition duration-300 ease-in-out transform hover:scale-105`}
                            style={{
                                backgroundImage: `url(${card.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                            <h3 className="relative z-10 text-white font-semibold py-20">{card.title}</h3>
                        </div>
                    ))}
                </section>

                
                <section className="bg-blue-500 py-10">
                    <h2 className="text-white text-center text-2xl font-bold mb-8">TESTIMONIOS</h2>
                    <div className="container mx-auto flex flex-wrap justify-center items-center gap-6">
                        <div className="bg-white rounded-lg shadow-lg w-full md:w-1/3">
                            <img src={Testimonio1} alt="Testimonio 1" className="w-full object-cover h-48" />
                            <div className="p-4">
                                <a href="/testimonios/1" className="text-blue-600 hover:text-blue-800 transition duration-300">Conoce más &gt;</a>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg w-full md:w-1/3">
                            <img src={Testimonio3} alt="Testimonio 3" className="w-full object-cover h-48" />
                            <div className="p-4">
                                <a href="/testimonios/2" className="text-blue-600 hover:text-blue-800 transition duration-300">Conoce más &gt;</a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-100 py-4">
                    <div className="container mx-auto text-center">
                        <h2 className="text-lg font-bold uppercase text-blue-600 mb-4">Partners</h2>
                        <div className="flex flex-wrap justify-center items-center gap-8">
                            <img src={LogoDynatrace} alt="Dynatrace" className="w-20" />
                            <img src={LogoOracle} alt="Oracle" className="w-20" />
                            <img src={LogoVmware} alt="Vmware" className="w-20" />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default NewPage;
