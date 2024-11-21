import moongose from 'mongoose'; // Importa Mongoose para definir el esquema y el modelo

// Define el esquema de historial de productos
const historyProductSchema = new moongose.Schema({
    idProduct: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        required: true, // Campo requerido
        ref: 'Product' // Referencia al modelo Product
    },
    idMovementType: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        required: true, // Campo requerido
        ref: 'MovementType' // Referencia al modelo MovementType
    },
    idUser: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        required: true, // Campo requerido
        ref: 'User' // Referencia al modelo User
    },
    dateMovement: {
        type: Date, // Tipo de dato Date
        default: Date.now // Valor por defecto es la fecha y hora actual
    }
});

// Exporta el modelo de historial de productos basado en el esquema definido
export default moongose.model('HistoryProduct', historyProductSchema);