const jwt = require('jsonwebtoken');  
const User = require('../models/User');  

exports.authenticate = async (req, res, next) => {  
    const token = req.headers['authorization']?.split(' ')[1];  
    if (!token) return res.status(401).json({ message: 'No token provided' });  

    try {  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        const user = await User.findById(decoded.id);  
        
        if (!user) {  
            return res.status(404).json({ message: 'Usuario no encontrado' });  
        }  

        req.user = user; // Guardar el usuario en req.user  
        next();  
    } catch (error) {  
        return res.status(401).json({ message: 'Unauthorized', error: error.message });  
    }  
};