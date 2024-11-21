import Stripe from 'stripe'; // Importa la biblioteca Stripe para manejar pagos
import { STRIPE_KEY } from '../server/config.js'; // Importa la clave secreta de Stripe desde la configuración

const stripe = new Stripe(STRIPE_KEY, {
    apiVersion: '2022-11-15', // Especifica la versión de la API de Stripe a utilizar
});

export default stripe; // Exporta la instancia de Stripe para su uso en otros módulos