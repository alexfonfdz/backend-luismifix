import moongose from "mongoose"; // Importa Mongoose para manejar la conexión a la base de datos
import { MONGO_URL, MONGO_DB } from "../server/config.js"; // Importa la URL y el nombre de la base de datos desde la configuración

moongose.set('strictQuery', true); // Configura Mongoose para usar consultas estrictas

// Función para conectar a la base de datos
const connectDB = async () => {
    try {
        const connection = await moongose.connect(
            MONGO_URL, { dbName: MONGO_DB, useNewUrlParser: true, useUnifiedTopology: true } // Conecta a la base de datos usando la URL y el nombre de la base de datos
        );
        console.log("Conexión exitosa a MongoDB en el puerto", moongose.connection.port); // Muestra un mensaje de éxito en la consola
        const retorno = { connection: connection }; // Crea un objeto de retorno con la conexión
        return retorno; // Devuelve el objeto de retorno
    } catch (error) {
        console.log("Error en la conexión a MongoDB", error); // Muestra un mensaje de error en la consola
    }
};

export default connectDB; // Exporta la función de conexión a la base de datos