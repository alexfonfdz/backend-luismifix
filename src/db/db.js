import moongose from "mongoose";
import { MONGO_URL, MONGO_DB } from "../server/config.js";

moongose.set('strictQuery', true);

const connectDB = async () => {
    try {
        const connection = await moongose.connect(
            MONGO_URL, { dbName: MONGO_DB, useNewUrlParser: true, useUnifiedTopology: true}
        );
        console.log("Conexión exitosa a MongoDB en el puerto", moongose.connection.port);
        const retorno = {connection: connection};
        return retorno;
    } catch (error) {
        console.log("Error en la conexión a MongoDB", error);
    }
};

export default connectDB;