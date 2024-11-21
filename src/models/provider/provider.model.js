import moongose from 'mongoose'; // Importa Mongoose para definir el esquema y el modelo

// Define el esquema de proveedor
const providerSchema = new moongose.Schema({
    idTypeProvider: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'TypeProvider', // Referencia al modelo TypeProvider
        required: true // Campo requerido
    },
    nameProvider: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Elimina espacios en blanco al inicio y al final
    },
    noteProvider: {
        type: String, // Tipo de dato String
        trim: true // Elimina espacios en blanco al inicio y al final
    },
    creationDateProvider: {
        type: Date, // Tipo de dato Date
        default: Date.now() // Valor por defecto es la fecha y hora actual
    },
    statusProvider: {
        type: Boolean, // Tipo de dato Boolean
        default: true // Valor por defecto es true
    }
});

// Exporta el modelo de proveedor basado en el esquema definido
export default moongose.model('Provider', providerSchema);