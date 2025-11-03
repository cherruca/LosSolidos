const express = require('express');  
const { createCV } = require('../controllers/cvController');  
const multer = require('multer');  

const router = express.Router();  

// Configuración de multer para manejar la carga de archivos  
const storage = multer.diskStorage({  
    destination: (req, file, cb) => {  
        cb(null, 'uploads/'); // Asegúrate de que esta carpeta exista  
    },  
    filename: (req, file, cb) => {  
        cb(null, Date.now() + '-' + file.originalname); // Renombrar el archivo para evitar conflictos  
    }  
});  

const upload = multer({ storage });  

// Ruta para crear un nuevo CV  
router.post('/', upload.single('archivo'), createCV);  

module.exports = router;