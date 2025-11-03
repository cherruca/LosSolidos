// controllers/cvController.js  
const CV = require('../models/CV');  

exports.createCV = async (req, res) => {  
    const {  
        nombre,  
        apellido,  
        genero,  
        fechaNacimiento,  
        departamento,  
        calleColonia,  
        numeroContacto1,  
        numeroContacto2,  
        correoElectronico,  
        expectativaLaboral,  
        educacionInicial,  
        educacionMedia,  
        educacionSuperior,  
        habilidades,  
        competencias,  
        servicio,  
    } = req.body;  

    try {  
        const newCV = new CV({  
            nombre,  
            apellido,  
            genero,  
            fechaNacimiento,  
            departamento,  
            calleColonia,  
            numeroContacto1,  
            numeroContacto2,  
            correoElectronico,  
            expectativaLaboral,  
            educacionInicial,  
            educacionMedia,  
            educacionSuperior,  
            habilidades,  
            competencias,  
            servicio,  
            archivo: req.file ? req.file.path : null // Asumiendo que usarás multer para manejar archivos  
        });  

        await newCV.save();  
        res.status(201).json({ message: 'CV guardado exitosamente', cv: newCV });  
    } catch (error) {  
        res.status(500).json({ message: 'Error al guardar el CV', error });  
    }  
};