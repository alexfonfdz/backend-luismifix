import moongose from 'mongoose'; // Importa Mongoose para definir el esquema y el modelo

// Define el esquema de historial de proveedores
const historyProviderSchema = new moongose.Schema({
    idProvider: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'Provider', // Referencia al modelo Provider
        required: true // Campo requerido
    },
    idMovementType: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'MovementType', // Referencia al modelo MovementType
        required: true // Campo requerido
    },
    idUser: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'User', // Referencia al modelo User
        required: true // Campo requerido
    },
    dateMovement: {
        type: Date, // Tipo de dato Date
        default: Date.now // Valor por defecto es la fecha y hora actual
    }
});

// Exporta el modelo de historial de proveedores basado en el esquema definido
export default moongose.model('HistoryProvider', historyProviderSchema);