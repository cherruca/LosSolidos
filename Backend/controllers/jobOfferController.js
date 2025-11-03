const JobOffer = require('../models/JobOffer');  
const User = require('../models/User');  

exports.createJobOffer = async (req, res) => {  
    const { title, description } = req.body;  
    const companyId = req.user.id; a  

    try {  
        const newOffer = new JobOffer({ title, description, company: companyId });  
        await newOffer.save();  
        res.status(201).json(newOffer);  
    } catch (error) {  
        res.status(500).json({ message: 'Error al crear la oferta', error });  
    }  
};  

exports.listJobOffers = async (req, res) => {  
    try {  
        const offers = await JobOffer.find().populate('company', 'companyName'); // Cambia 'companyName' según tu modelo  
        res.status(200).json(offers);  
    } catch (error) {  
        res.status(500).json({ message: 'Error al listar ofertas', error });  
    }  
};  

exports.applyToJobOffer = async (req, res) => {  
    const { id } = req.params; // ID de la oferta  
    const userId = req.user.id; // ID del usuario que aplica  

    try {  
        const offer = await JobOffer.findById(id);  
        if (!offer) return res.status(404).json({ message: 'Oferta no encontrada' });  

        if (!offer.applicants.includes(userId)) {  
            offer.applicants.push(userId);  
            await offer.save();  
        }  

        res.status(200).json({ message: 'Aplicación exitosa' });  
    } catch (error) {  
        res.status(500).json({ message: 'Error al aplicar a la oferta', error });  
    }  
};  

exports.getJobOfferById = async (req, res) => {  
    const { id } = req.params; // ID de la oferta  

    try {  
        const offer = await JobOffer.findById(id).populate('company', 'companyName');  
        if (!offer) return res.status(404).json({ message: 'Oferta no encontrada' });  

        res.status(200).json(offer);  
    } catch (error) {  
        res.status(500).json({ message: 'Error al obtener la oferta', error });  
    }  
};