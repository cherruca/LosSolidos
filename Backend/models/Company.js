const mongoose = require('mongoose');  

const companySchema = new mongoose.Schema({  
    companyName: { type: String, required: true },  
    email: { type: String, required: true, unique: true },  
    telephone: { type: String, required: true },  
    password: { type: String, required: true },  
    department: { type: String, required: true },  
    municipality: { type: String, required: true },  
    description: { type: String },    
    role: { type: String, default: 'company' } 
}, { timestamps: true });  

module.exports = mongoose.model('Company', companySchema);