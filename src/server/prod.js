export default {
  googleProjectID: process.env.GOOGLE_PROJECT_ID, // ID del proyecto de Google Cloud
  dialogFlowSessionID: process.env.DIALOGFLOW_SESSION_ID, // ID de la sesión de Dialogflow
  dialogFlowSessionLanguageCode: process.env.DIALOGFLOW_LANGUAGE_CODE, // Código de idioma de la sesión de Dialogflow
  googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL, // Correo electrónico del cliente de Google
  googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') // Clave privada de Google, reemplaza los caracteres de nueva línea
};