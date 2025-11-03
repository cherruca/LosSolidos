const express = require('express');  
const { getApplicationById, updateApplication } = require('../controllers/applyController');  
const { authenticate } = require('../middleware/authMiddleware');  

const router = express.Router();  

// Obtener información sobre una oferta específica  
router.get('/:ofertaId', authenticate, getApplicationById);  

// Actualizar una solicitud de aplicación  
router.put('/:id', authenticate, updateApplication);  

module.exports = router;