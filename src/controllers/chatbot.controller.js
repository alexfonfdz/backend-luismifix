import dialogFlow from "dialogflow";
import { jsonToStructProto } from "./structjson.controller.js";
import config from "../server/keys.js";

const projectID = config.googleProjectID;
const sessionID = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

const credentials = {
  client_email: config.googleClientEmail,
  private_key: config.googlePrivateKey
};

const sessionClient = new dialogFlow.SessionsClient({ projectID, credentials });

// Función para manejar consultas de texto
const textQuery = async function(text, userID, parameters = {}) {
  let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: languageCode
      }
    },
    queryParams: {
      payload: {
        data: parameters
      }
    }
  };

  try {
    let responses = await sessionClient.detectIntent(request);
    responses = await handleAction(responses);
    return responses;
  } catch (error) {
    throw error;
  }
};

// Función para manejar consultas de eventos
const eventQuery = async function(event, userID, parameters = {}) {
  let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);

  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        name: event,
        parameters: jsonToStructProto(parameters),
        languageCode: languageCode
      }
    }
  };

  try {
    let responses = await sessionClient.detectIntent(request);
    responses = await handleAction(responses);
    return responses;
  } catch (error) {
    throw error;
  }
};

// Función para manejar acciones basadas en la respuesta de Dialogflow
const handleAction = function(responses) {
  let queryResult = responses[0].queryResult;
  switch (queryResult.action) {
    case "input.whoAreYou":
      break;
  }
  return responses;
};

export { textQuery, eventQuery, handleAction }; // Exporta las funciones para su uso en otros módulos