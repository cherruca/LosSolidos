const mongoose = require('mongoose');  

const userSchema = new mongoose.Schema({  
    firstName: { type: String, required: true },  
    lastName: { type: String, required: true },  
    email: { type: String, required: true, unique: true },  
    telephone: { type: String, required: true },  
    birthDate: { type: Date, required: true },  
    department: { type: String, required: true },  
    municipality: { type: String, required: true },  
    gender: { type: String, required: true },  
    password: { type: String, required: true },  
    role: { type: String, default: 'user' }  
}, { timestamps: true });  

module.exports = mongoose.model('User', userSchema);