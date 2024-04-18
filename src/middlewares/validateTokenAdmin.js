import jwt from "jsonwebtoken";
import { SECRET } from "../server/config.js";
import TypeUser from "../models/TypeUser.js";

export const authRequiredAdmin = (req, res, next) => {
    const { token } = req.cookies;

    if(!token) return res.status(401).json({message: "Acceso denegado, no token"});

    jwt.verify(token, SECRET, (err, user) => {
        if(err) return res.status(403).json({message: "Acceso denegado"});

        const typeUser = TypeUser.findById(user.idTypeUser);

        if(!typeUser) return res.status(404).json({message: "Tipo de usuario desconocido"});

        if(typeUser.nameTypeUser !== "Administrador") return res.status(403).json({message: "Acceso denegado, no eres administrador"});

        req.user = user;
        next();
    });
};