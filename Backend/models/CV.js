const mongoose = require('mongoose');  

const cvSchema = new mongoose.Schema({  
    nombre: { type: String, required: true },  
    apellido: { type: String, required: true },  
    genero: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },  
    departamento: { type: String, required: true },  
    calleColonia: { type: String, required: true },  
    numeroContacto1: { type: String, required: true },  
    numeroContacto2: { type: String },  
    correoElectronico: { type: String, required: true },  
    expectativaLaboral: { type: String, required: true },  
    educacionInicial: { type: String, required: true },  
    educacionMedia: { type: String, required: true },  
    educacionSuperior: { type: String, required: true },  
    habilidades: { type: String, required: true },  
    competencias: { type: String, required: true },  
    servicio: { type: String, required: true }, 
    archivo: { type: String } 
}, { timestamps: true });  

module.exports = mongoose.model('CV', cvSchema);