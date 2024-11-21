import dotenv from 'dotenv'; // Importa dotenv para manejar variables de entorno

dotenv.config(); // Carga las variables de entorno desde un archivo .env

export const PORT = process.env.PORT || 3000; // Puerto en el que se ejecutará el servidor

export const MONGO_URL = process.env.MONGO_URL; // URL de conexión a la base de datos MongoDB

export const SECRET = process.env.SECRET; // Secreto utilizado para la autenticación y otras operaciones

export const MONGO_DB = process.env.MONGO_DB; // Nombre de la base de datos MongoDB

export const FRONT_URL = process.env.FRONTEND_URL; // URL del frontend de la aplicación

export const STRIPE_KEY = process.env.STRIPE_SECRET_KEY; // Clave secreta de Stripe para procesar pagos

export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET; // Secreto del webhook de Stripe para verificar la autenticidad de los eventos