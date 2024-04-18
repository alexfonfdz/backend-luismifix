import User from "../models/user/user.model.js";
import TypeUser from "../models/type/typeUser.model.js";
import bcrypt from "bcryptjs";
import connectDB from "../db/db.js";
import mongoData from "../middlewares/mongoData.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
    const { typeUser, username, email, password } = req.body;
    
    try{
        if(email === "" || password === "" || username === "" || typeUser === "") return res.status(400).json({message: "Por favor, rellene todos los campos"});
        if(password.length < 8) return res.status(400).json({message: "La contraseña debe tener al menos 8 caracteres"});
        if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) return res.status(400).json({message: "La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número"});
        if(username.length < 4) return res.status(400).json({message: "El nombre de usuario debe tener al menos 4 caracteres"});
        if(!username.match(/^[a-zA-Z0-9]+$/)) return res.status(400).json({message: "El nombre de usuario solo puede contener letras y números"});
        if(!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) return res.status(400).json({message: "Correo electrónico inválido"});
        
        const userFound = await User.findOne({username: username});

        if(userFound) return res.status(400).json({message: "El nombre de usuario ya está en uso"});

        const passwordHash = await bcrypt.hash(password, 10);

        const idTypeUser = await TypeUser.findOne({nameTypeUser: typeUser}).select("_id");

        if(!idTypeUser) return res.status(400).json({message: "Tipo de usuario no encontrado"});

        const newUser = new User({
            idTypeUser: idTypeUser,
            username,
            email,
            password: passwordHash,
        });

        const userSaved = await newUser.save();

        return res.status(201).json({message: "Usuario registrado con éxito"});

    }catch(error){
        return res.status(500).json({message: error.message});
    }

};

export const login = async (req, res) => {
    const { username, password } = req.body;
    
    try{


        if(username === "" || password === "") return res.status(400).json({message: "Por favor, rellene todos los campos"});

        const userFound = await User.findOne({username});

        if(!userFound) return res.status(400).json({message: "Usuario no encontrado"});

        const matchPassword = await bcrypt.compare(password, userFound.password);

        if(!matchPassword) return res.status(400).json({message: "Contraseña incorrecta"});

        const token = await createAccessToken({id: userFound._id, idTypeUser: userFound.idTypeUser});

        res.cookie('token', token, {httpOnly: true, sameSite: true});

        return res.status(200).json({message: "Inicio de sesión exitoso"});

    }catch(error){
        res.status(500).json({message: error.message});
    }

};

export const logout = async (req, res) => {
    res.cookie('token', "",{expires: new Date(0)});
    return res.status(200).json({message: "Cierre de sesión exitoso"});
};
