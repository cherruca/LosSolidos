const User = require('../models/User');  

exports.getUserById = async (req, res) => {  
    const user = await User.findById(req.params.userId);  
    res.json(user);  
};  

exports.updateUser = async (req, res) => {  
    const user = await User.findByIdAndUpdate(req.params.userId, req.body);  
    res.json({ message: 'User updated successfully' });  
};  

exports.deleteUser = async (req, res) => {  
    await User.findByIdAndDelete(req.params.userId);  
    res.json({ message: 'User deleted successfully' });  
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({role: { $ne: 'admin' }}).select('-password -roles -salt -hashedPassword -role -tokens');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error getting users', error });
    }
}