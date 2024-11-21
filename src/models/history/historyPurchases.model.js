import moongose from 'mongoose'; // Importa Mongoose para definir el esquema y el modelo

// Define el esquema de historial de compras
const historyPurchasesSchema = new moongose.Schema({
    idPurchase: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'Purchase', // Referencia al modelo Purchase
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
        default: Date.now() // Valor por defecto es la fecha y hora actual
    }
});

// Exporta el modelo de historial de compras basado en el esquema definido
export default moongose.model('HistoryPurchases', historyPurchasesSchema);