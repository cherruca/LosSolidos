const JobApplication = require('../models/JobApplication');  

// Obtener información sobre una oferta específica  
exports.getApplicationById = async (req, res) => {  
    const { ofertaId } = req.params;  
    try {  
        const application = await JobApplication.findById(ofertaId);  
        if (!application) {  
            return res.status(404).json({ message: 'Aplicación no encontrada' });  
        }  
        res.status(200).json(application);  
    } catch (error) {  
        res.status(500).json({ message: 'Error al obtener la aplicación', error });  
    }  
};  

// Actualizar una solicitud de aplicación  
exports.updateApplication = async (req, res) => {  
    const { id } = req.params;  
    const updates = req.body; // Asegúrate de validar los datos de entrada  

    try {  
        const updatedApplication = await JobApplication.findByIdAndUpdate(id, updates, { new: true });  
        if (!updatedApplication) {  
            return res.status(404).json({ message: 'Aplicación no encontrada' });  
        }  
        res.status(200).json(updatedApplication);  
    } catch (error) {  
        res.status(500).json({ message: 'Error al actualizar la aplicación', error });  
    }  
};