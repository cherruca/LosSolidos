const express = require('express');  
const cors = require('cors');  
const connectDB = require('./config/db');  
const authRoutes = require('./routes/auth');  
const userRoutes = require('./routes/user');  
const jobApplicationRoutes = require('./routes/jobApplication');  
const applyRoutes = require('./routes/apply');  
const cvRoutes = require('./routes/cv');  
const feedbackRoutes = require('./routes/feedback');  
const jobOfferRoutes = require('./routes/jobOffer');

const app = express();  
connectDB();  

// Configurar CORS  
app.use(cors({  
    origin: '*',  
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],  
    allowedHeaders: ['Content-Type', 'Authorization']  
}));  

app.use(express.json());  
app.use('/api/auth', authRoutes);  
app.use('/api/user', userRoutes);  
app.use('/api/job-application', jobApplicationRoutes);  
app.use('/api/apply', applyRoutes);  
app.use('/api/cv', cvRoutes);  
app.use('/api/feedback', feedbackRoutes);  
app.use('/api/job-offers', jobOfferRoutes);  
 

const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {  
    console.log(`Server running on port ${PORT}`);  
});