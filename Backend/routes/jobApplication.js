const express = require('express');  
const { applyForJob, getApplicationsByUser, getAllApplications } = require('../controllers/jobApplicationController');  
const { authenticate } = require('../middleware/authMiddleware');  
const { authorize } = require('../middleware/roleMiddleware');  
const { roles } = require('../config/roles');  

const router = express.Router();  

// Ruta para que un usuario aplique a un trabajo  
router.post('/apply', authenticate, applyForJob);  

// Ruta para que un usuario vea sus propias postulaciones  
router.get('/user/:userId', authenticate, getApplicationsByUser);  

// Ruta para que un admin vea todas las postulaciones  
router.get('/', authenticate, authorize(roles.ADMIN), getAllApplications);  

module.exports = router;