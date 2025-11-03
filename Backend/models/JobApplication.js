const mongoose = require('mongoose');  

const jobApplicationSchema = new mongoose.Schema({  
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vacant', required: true },  
    status: { type: String, default: 'pending' },  
}, { timestamps: true });  

module.exports = mongoose.model('JobApplication', jobApplicationSchema);