import moongose from 'mongoose'; // Importa Mongoose para definir el esquema y el modelo

// Define el esquema de cliente
const clientSchema = new moongose.Schema({
    nameClient: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Elimina espacios en blanco al inicio y al final
    },
    lastNameClient: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Elimina espacios en blanco al inicio y al final
    },
    secondLastNameClient: {
        type: String, // Tipo de dato String
        trim: true // Elimina espacios en blanco al inicio y al final
    }
});

// Exporta el modelo de cliente basado en el esquema definido
export default moongose.model('Client', clientSchema);