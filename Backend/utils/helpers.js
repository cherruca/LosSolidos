/**  
 * Función para validar un correo electrónico.  
 * @param {string} email - El correo electrónico a validar.  
 * @returns {boolean} - Retorna true si el correo es válido, de lo contrario false.  
 */  

const validateEmail = (email) => {  
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    return re.test(String(email).toLowerCase());  
  };  
  
  /**  
   * Función para generar un token JWT.  
   * @param {object} user - El objeto del usuario.  
   * @param {string} secret - La clave secreta para firmar el token.  
   * @param {number} expiresIn - Tiempo de expiración en segundos.  
   * @returns {string} - Retorna el token generado.  
   */  
  const generateToken = (user, secret, expiresIn) => {  
    const jwt = require('jsonwebtoken');  
    return jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn });  
  };  
  
  /**  
   * Función para formatear una fecha a un formato legible.  
   * @param {Date} date - La fecha a formatear.  
   * @returns {string} - Retorna la fecha formateada.  
   */  
  
  const formatDate = (date) => {  
    return date.toLocaleDateString('es-ES', {  
      year: 'numeric',  
      month: 'long',  
      day: 'numeric',  
    });  
  };  
  
  module.exports = {  
    validateEmail,  
    generateToken,  
    formatDate,  
  };