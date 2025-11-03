// models/JobOffer.js  
const mongoose = require('mongoose');  

const jobOfferSchema = new mongoose.Schema({  
    title: {  
        type: String,  
        required: true,  
    },  
    description: {  
        type: String,  
        required: true,  
    },  
    company: {  
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'String',  
        required: true,  
    },  
    applicants: [{  
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',  
    }],  
}, { timestamps: true });  

const JobOffer = mongoose.model('JobOffer', jobOfferSchema);  
module.exports = JobOffer;