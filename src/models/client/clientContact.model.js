import moongose from 'mongoose'; // Importa Mongoose para definir el esquema y el modelo

// Define el esquema de contacto de cliente
const clientContactSchema = new moongose.Schema({
    idTypeContact: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'TypeContact', // Referencia al modelo TypeContact
        required: true // Campo requerido
    },
    idClient: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'Client', // Referencia al modelo Client
        required: true // Campo requerido
    },
    data: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Elimina espacios en blanco al inicio y al final
    }
});

// Exporta el modelo de contacto de cliente basado en el esquema definido
export default moongose.model('ClientContact', clientContactSchema);