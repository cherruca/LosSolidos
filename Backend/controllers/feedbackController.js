const Feedback = require('../models/Feedback');  

exports.submitFeedback = async (req, res) => {  
    const { message } = req.body;  
    const feedback = new Feedback({ userId: req.user.id, message });  
    await feedback.save();  
    res.status(201).json({ message: 'Feedback submitted successfully' });  
};  

exports.getFeedbackByUser = async (req, res) => {  
    const feedback = await Feedback.find({ userId: req.params.userId });  
    res.json(feedback);  
};