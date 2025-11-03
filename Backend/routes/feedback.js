const express = require('express');  
const { submitFeedback, getFeedbackByUser } = require('../controllers/feedbackController');  
const { authenticate } = require('../middleware/authMiddleware');  
const { authorize } = require('../middleware/roleMiddleware');  
const { roles } = require('../config/roles');  

const router = express.Router();  

// Ruta para enviar retroalimentación (solo usuarios y empresas)  
router.post('/', authenticate, authorize([roles.USER, roles.COMPANY]), submitFeedback);  

// Ruta para que un admin vea la retroalimentación de un usuario  
router.get('/user/:userId', authenticate, authorize([roles.ADMIN]), getFeedbackByUser);  

module.exports = router;