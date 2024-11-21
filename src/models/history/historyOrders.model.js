import mongoose from 'mongoose'; // Importa Mongoose para definir el esquema y el modelo

// Define el esquema de historial de compras
const historyPurchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'User', // Referencia al modelo User
        required: true // Campo requerido
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
                ref: 'Product', // Referencia al modelo Product
                required: true // Campo requerido
            },
            quantity: {
                type: Number, // Tipo de dato Number
                required: true, // Campo requerido
                default: 1 // Valor por defecto es 1
            },
            totalPriceProduct: {
                type: Number, // Tipo de dato Number
                required: true // Campo requerido
            }
        }
    ],
    totalAmount: {
        type: Number, // Tipo de dato Number
        required: true // Campo requerido
    },
    status: {
        type: String, // Tipo de dato String
        enum: ['PENDIENTE', 'COMPLETO', 'FALLIDO'], // Valores permitidos
        default: 'PENDIENTE' // Valor por defecto es 'PENDIENTE'
    },
    createdAt: {
        type: Date, // Tipo de dato Date
        default: Date.now // Valor por defecto es la fecha y hora actual
    }
});

// Exporta el modelo de historial de compras basado en el esquema definido
export default mongoose.model('PurchaseHistory', historyPurchaseSchema);