import jwt from "jsonwebtoken"; // Importa jsonwebtoken para manejar tokens JWT
import { SECRET } from "../server/config.js"; // Importa el secreto desde la configuración

// Middleware para autenticar a todos los usuarios
export const authRequiredAllUsers = (req, res, next) => {
    const { token } = req.cookies; // Obtiene el token de las cookies

    if (!token) return res.status(401).json({ message: "Acceso denegado, no token" }); // Si no hay token, devuelve un error 401

    jwt.verify(token, SECRET, (err, user) => { // Verifica el token usando el secreto
        if (err) return res.status(403).json({ message: "Acceso denegado" }); // Si hay un error en la verificación, devuelve un error 403
        req.user = user; // Si el token es válido, añade el usuario a la solicitud
        next(); // Llama a la siguiente función middleware
    });
};