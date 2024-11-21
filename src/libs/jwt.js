import { SECRET } from "../server/config.js"; // Importa el secreto desde la configuración
import jwt from "jsonwebtoken"; // Importa jsonwebtoken para manejar tokens JWT

// Función para crear un token de acceso
export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, { expiresIn: '2h' }, (err, token) => { // Firma el token con el payload y el secreto, y establece una expiración de 2 horas
            if (err) reject(err); // Si hay un error, rechaza la promesa con el error
            resolve(token); // Si no hay error, resuelve la promesa con el token
        });
    });
};