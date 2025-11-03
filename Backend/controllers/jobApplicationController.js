const JobApplication = require('../models/JobApplication');  

// Obtener todas las postulaciones (para el admin)  
exports.getAllApplications = async (req, res) => {  
    try {  
        const applications = await JobApplication.find()  
            .populate('userId', 'firstName lastName email') // Población de datos del usuario  
            .populate('jobId', 'jobName'); // Población de datos de la vacante  
        res.status(200).json(applications);  
    } catch (error) {  
        res.status(500).json({ message: 'Error al obtener las postulaciones', error });  
    }  
};  

// Obtener postulaciones de un usuario específico  
exports.getApplicationsByUser = async (req, res) => {  
    const applications = await JobApplication.find({ userId: req.params.userId });  
    res.json(applications);  
};  

// Aplicar a un trabajo  
exports.applyForJob = async (req, res) => {  
    const { jobId } = req.body;  
    const application = new JobApplication({ userId: req.user.id, jobId });  
    await application.save();  
    res.status(201).json({ message: 'Application submitted successfully' });  
};