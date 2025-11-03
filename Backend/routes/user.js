const express = require('express');  
const { getUserById, updateUser, deleteUser, getUsers} = require('../controllers/userController');  
const { authenticate } = require('../middleware/authMiddleware');  
const { authorize } = require('../middleware/roleMiddleware');  
const { roles } = require('../config/roles');  

const router = express.Router();  

// Ruta para que un admin vea un usuario específico  
router.get('/:userId', authenticate, authorize([roles.ADMIN]), getUserById);  

// Ruta para que un admin actualice un usuario  
router.patch('/:userId', authenticate, authorize([roles.ADMIN]), updateUser);  

// Ruta para que un admin elimine un usuario  
router.delete('/:userId', authenticate, authorize([roles.ADMIN]), deleteUser); 

router.get('/', authenticate, authorize([roles.ADMIN]), getUsers);

module.exports = router;