import { textQuery, eventQuery } from "../controllers/chatbot.controller.js";

// Controlador para manejar consultas de texto
export const handleTextQuery = async (req, res) => {
  const { text, userID, parameters } = req.body;

  try {
    const responses = await textQuery(text, userID, parameters);
    if (!responses || !responses[0]) {
      throw new Error('No response from Dialogflow');
    }
    const result = responses[0].queryResult;
    res.send(result);
  } catch (err) {
    console.log("ERROR:", err);
    res.status(400).send("error");
  }
};

// Controlador para manejar consultas de eventos
export const handleEventQuery = async (req, res) => {
  const { event, userID, parameters } = req.body;

  try {
    const responses = await eventQuery(event, userID, parameters);
    if (!responses || !responses[0]) {
      throw new Error('No response from Dialogflow');
    }
    const result = responses[0].queryResult;
    res.send(result);
  } catch (err) {
    console.log("ERROR:", err);
    res.status(400).send("error");
  }
};