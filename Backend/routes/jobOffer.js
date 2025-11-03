const express = require('express');  
const {  
    createJobOffer,  
    listJobOffers,  
    applyToJobOffer,  
    getJobOfferById  
} = require('../controllers/jobOfferController');  
const { authenticate } = require('../middleware/authMiddleware');  
const { authorize } = require('../middleware/roleMiddleware');  
const { roles } = require('../config/roles');  

const router = express.Router();  

// Ruta para crear una nueva oferta de trabajo  
router.post('/', authenticate, authorize([roles.COMPANY]), createJobOffer);  

// Ruta para listar todas las ofertas de trabajo  
router.get('/', authenticate, listJobOffers);  

// Ruta para aplicar a una oferta de trabajo  
router.post('/apply/:id', authenticate, applyToJobOffer);  

// Ruta para obtener una oferta de trabajo específica  
router.get('/:id', authenticate, getJobOfferById);  

module.exports = router;