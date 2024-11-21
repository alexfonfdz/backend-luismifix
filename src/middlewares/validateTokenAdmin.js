import jwt from "jsonwebtoken"; // Importa jsonwebtoken para manejar tokens JWT
import { SECRET } from "../server/config.js"; // Importa el secreto desde la configuración
import TypeUser from "../models/type/typeUser.model.js"; // Importa el modelo TypeUser

// Middleware para autenticar a los administradores
export const authRequiredAdmin = (req, res, next) => {
    const { token } = req.cookies; // Obtiene el token de las cookies

    if (!token) return res.status(401).json({ message: "Acceso denegado, no token" }); // Si no hay token, devuelve un error 401

    jwt.verify(token, SECRET, async (err, user) => { // Verifica el token usando el secreto
        if (err) return res.status(403).json({ message: "Acceso denegado" }); // Si hay un error en la verificación, devuelve un error 403
        
        const typeUser = await TypeUser.findById(user.idTypeUser); // Busca el tipo de usuario por su ID
        
        if (!typeUser) return res.status(404).json({ message: "Tipo de usuario desconocido" }); // Si no se encuentra el tipo de usuario, devuelve un error 404

        if (typeUser.nameTypeUser !== "Administrador") return res.status(403).json({ message: "Acceso denegado, no eres administrador" }); // Si el usuario no es administrador, devuelve un error 403

        req.user = user; // Si el token es válido y el usuario es administrador, añade el usuario a la solicitud
        next(); // Llama a la siguiente función middleware
    });
};