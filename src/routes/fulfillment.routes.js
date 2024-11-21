import { Router } from "express"; // Importa Router de Express para crear rutas
import { WebhookClient } from "dialogflow-fulfillment"; // Importa WebhookClient de dialogflow-fulfillment para manejar las solicitudes de webhook

const router = Router(); // Crea una nueva instancia de Router

// Define la ruta para manejar las solicitudes de webhook de Dialogflow
router.post('/', (req, res) => {
  const agent = new WebhookClient({ request: req, response: res }); // Crea una nueva instancia de WebhookClient con la solicitud y la respuesta
  let intentMap = new Map(); // Crea un mapa de intenciones vacío
  agent.handleRequest(intentMap); // Maneja la solicitud de webhook con el mapa de intenciones
});

export default router; // Exporta el router para su uso en otros módulos