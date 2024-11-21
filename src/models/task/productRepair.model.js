import moongose from 'mongoose'; // Importa Mongoose para definir el esquema y el modelo

// Define el esquema de producto de reparación
const productRepairSchema = new moongose.Schema({
    idProduct: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'Product', // Referencia al modelo Product
        required: true // Campo requerido
    },
    idRepair: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'Repair', // Referencia al modelo Repair
        required: true // Campo requerido
    },
    amountProduct: {
        type: Number, // Tipo de dato Number
        required: true // Campo requerido
    },
    totalPriceProduct: {
        type: Number, // Tipo de dato Number
        required: true // Campo requerido
    }
});

// Exporta el modelo de producto de reparación basado en el esquema definido
export default moongose.model('ProductRepair', productRepairSchema);