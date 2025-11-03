const User = require('../models/User');  
const Company = require('../models/Company');  
const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');  
const { request } = require('express');

// Registrar un nuevo usuario (candidato)  
exports.registerUser = async (req, res) => {  
    const { firstName, lastName, email, telephone, birthDate, department, municipality, gender, password } = req.body;  

    try {  
        const existingUser = await User.findOne({ email });  
        if (existingUser) {  
            return res.status(400).json({ message: 'El usuario ya existe' });  
        }  

        const hashedPassword = await bcrypt.hash(password, 10);  
        const newUser = new User({  
            firstName,  
            lastName,  
            email,  
            telephone,  
            birthDate,  
            department,  
            municipality,  
            gender,  
            password: hashedPassword  
        });  

        await newUser.save();  
        res.status(201).json({ message: 'Usuario registrado exitosamente' });  
    } catch (error) {  
        res.status(500).json({ message: 'Error al registrar el usuario', error });  
    }  
};  

// Registrar una nueva empresa (reclutador)  
exports.registerCompany = async (req, res) => {  
    const { companyName, email, telephone, password, department, municipality, description } = req.body;  

    try {  
        const existingCompany = await Company.findOne({ email });  
        if (existingCompany) {  
            return res.status(400).json({ message: 'La empresa ya existe' });  
        }  

        const hashedPassword = await bcrypt.hash(password, 10);  
        const newCompany = new Company({  
            companyName,  
            email,  
            telephone,  
            password: hashedPassword,  
            department,  
            municipality,  
            description  
        });  

        await newCompany.save();  
        res.status(201).json({ message: 'Empresa registrada exitosamente' });  
    } catch (error) {  
        res.status(500).json({ message: 'Error al registrar la empresa', error });  
    }  
};  

// Obtener información de la empresa autenticada
exports.getCompanyInfo = async (req, res) => {  
    const {id} = req.params;
    try {  
        // Obtener la empresa a partir del ID del token  
        const company = await Company.findById(id).select('-password'); // Excluir la contraseña  
        if (!company) {  
            return res.status(404).json({ message: 'Empresa no encontrada' });  
        }  

        res.status(200).json(company);  
    } catch (error) {  
        res.status(500).json({ message: 'Error al obtener información de la empresa', error });  
    }  
};

// Iniciar sesión  
exports.login = async (req, res) => {  
    const { email, password } = req.body;  

    try {  
        // Buscar el usuario por correo electrónico  
        let user = await User.findOne({ email });  
        if (!user) {  
            user = await Company.findOne({ email });  
        }  

        if (!user) {  
            return res.status(404).json({ message: 'Usuario no encontrado' });  
        }

        // Comparar la contraseña proporcionada con la almacenada  
        const isMatch = await bcrypt.compare(password, user.password);  
        if (!isMatch) {  
            return res.status(400).json({ message: 'Credenciales inválidas' });  
        }  

        const role = user.role;
        const id = user.id;

        // Generar un token JWT  
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });  

        res.status(200).json({ message: 'Inicio de sesión exitoso', token, role, id});  
    } catch (error) {  
        res.status(500).json({ message: 'Error al iniciar sesión', error });  
    }  
};  

// Obtener información del usuario autenticado  
exports.getUserInfo = async (req, res) => {  
    try {  
        // Obtener el usuario a partir del ID del token  
        const user = await User.findById(req.user.id).select('-password'); // Excluir la contraseña de la respuesta  
        if (!user) {  
            return res.status(404).json({ message: 'Usuario no encontrado' });  
        }  

        res.status(200).json(user);  
    } catch (error) {  
        res.status(500).json({ message: 'Error al obtener información del usuario', error });  
    }  
};  

// Actualizar el perfil del usuario  
exports.updateUserProfile = async (req, res) => {  
    const { firstName, lastName, telephone, birthDate, department, municipality, gender } = req.body;  

    try {  
        // Buscar el usuario por ID  
        const user = await User.findById(req.params.userId);  
        if (!user) {  
            return res.status(404).json({ message: 'Usuario no encontrado' });  
        }  

        // Actualizar los campos del usuario  
        user.firstName = firstName || user.firstName;  
        user.lastName = lastName || user.lastName;  
        user.telephone = telephone || user.telephone;  
        user.birthDate = birthDate || user.birthDate;  
        user.department = department || user.department;  
        user.municipality = municipality || user.municipality;  
        user.gender = gender || user.gender;  

        await user.save();  
        res.status(200).json({ message: 'Perfil actualizado exitosamente', user });  
    } catch (error) {  
        res.status(500).json({ message: 'Error al actualizar el perfil', error });  
    }  
};