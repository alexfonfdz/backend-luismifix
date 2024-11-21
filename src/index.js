import app from "./server/app.js"; // Importa la configuración del servidor
import { PORT } from "./server/config.js"; // Importa la configuración del puerto
import connectDB from "./db/db.js"; // Importa la función para conectar a la base de datos
import mongoData from "./middlewares/mongoData.js"; // Importa un middleware para manejar datos de MongoDB

// Conectar a la base de datos
connectDB();

// Iniciar el servidor
app.listen(PORT || 3000, () => {
    console.log(`Puerto iniciado en ${PORT || 3000}`); // Muestra un mensaje en la consola indicando que el servidor ha iniciado y en qué puerto
    mongoData(); // Ejecutar middleware relacionado con MongoDB
});