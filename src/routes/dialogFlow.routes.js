import { Router } from "express"; // Importa Router de Express para crear rutas
import { handleTextQuery, handleEventQuery } from "../controllers/dialogFlow.controller.js"; // Importa los controladores para manejar las solicitudes de consultas de texto y eventos de Dialogflow

const router = Router(); // Crea una nueva instancia de Router

// Define las rutas para manejar las consultas de texto y eventos de Dialogflow
router.post("/api/df_text_query", handleTextQuery); // Ruta para manejar consultas de texto de Dialogflow
router.post("/api/df_event_query", handleEventQuery); // Ruta para manejar consultas de eventos de Dialogflow

export default router; // Exporta el router para su uso en otros módulos