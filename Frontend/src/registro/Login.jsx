import React from 'react';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NewsImage from '../assets/Empleado.png';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvide';


export default function Login() {

  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [datosFormulario, setDatosFormulario] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const redirectByRole = (role) => {
    switch (role) {
      case 'admin':
        navigate('/admin/users');
        break;
      case 'company':
        navigate('/PerfilE');
        break;
      default:
        navigate('/');
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleChange = (e) => {
    setDatosFormulario({ ...datosFormulario, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    let response;

    try {
      response = await axios.post('https://api-grupo-software.onrender.com/api/auth/login', JSON.stringify(datosFormulario), {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('id', response.id )
      login(response.data.role);
      alert("Logeado correctamente")
      setShouldNavigate(true);

      redirectByRole(response.data.role);
      

    } catch (error) {
      console.log(error);
      alert(error.response.data.error || error.response.data.errors[0].message)
    }

 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-800 to-teal-500 py-2">
      {shouldNavigate ? <Navigate to="/" /> : null}
      <div className="flex flex-col justify-center mr-10 space-y-6 w-96">

        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xl" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo electrónico
            </label>
            <input onChange={handleChange} name='email' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Correo electrónico" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input onChange={handleChange} name='password' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" required />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
              Ingresar
            </button>
          </div>
          <div className="flex flex-col items-center mt-4 space-y-2">
            <Link to="/forgot-password" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              ¿Olvidaste la contraseña?
            </Link>
            <Link to="/Registro" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              ¿No tienes una cuenta?
            </Link>
          </div>

        </form>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="w-80 max-w-3xl mx-auto">
          <Slider {...settings}>
            <div>
              <img src={NewsImage} alt="news" className="h-64 md:h-96 object-cover rounded-lg" />
            </div>
            <div>
              <img src={NewsImage} alt="news" className="h-64 md:h-96 object-cover rounded-lg" />
            </div>
            <div>
              <img src={NewsImage} alt="news" className="h-64 md:h-96 object-cover rounded-lg" />
            </div>
          </Slider>
        </div>
      </div>

    </div>
  );
}
