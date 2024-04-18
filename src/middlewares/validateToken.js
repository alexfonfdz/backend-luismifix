import jwt from "jsonwebtoken";
import { SECRET } from "../server/config.js";

export const authRequired = (req, res, next) => {
    const { token } = req.cookies;

    if(!token) return res.status(401).json({message: "Acceso denegado, no token"});

    jwt.verify(token, SECRET, (err, user) => {
        if(err) return res.status(403).json({message: "Acceso denegado"});
        req.user = user;
        next();
    });
};