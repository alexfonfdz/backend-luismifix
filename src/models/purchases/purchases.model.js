import moongose from 'mongoose'; // Importa Mongoose para definir el esquema y el modelo

// Define el esquema de compra a proveedores
const purchaseSchema = new moongose.Schema({
    idProduct: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'Product', // Referencia al modelo Product
        required: true // Campo requerido
    },
    idProvider: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'Provider', // Referencia al modelo Provider
        required: true // Campo requerido
    },
    linkProvider: {
        type: String, // Tipo de dato String
        required: true // Campo requerido
    },
    priceProduct: {
        type: Number, // Tipo de dato Number
        required: true // Campo requerido
    },
    statusPurchase: {
        type: Boolean, // Tipo de dato Boolean
        default: true // Valor por defecto es true
    }
});

// Exporta el modelo de compra basado en el esquema definido
export default moongose.model('Purchase', purchaseSchema);