import moongose from 'mongoose'; // Importa Mongoose para definir el esquema y el modelo

// Define el esquema de producto
const productSchema = new moongose.Schema({
    idTypeProduct: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'TypeProduct', // Referencia al modelo TypeProduct
        required: true // Campo requerido
    },
    nameProduct: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Elimina espacios en blanco al inicio y al final
    },
    amountProduct: {
        type: Number, // Tipo de dato Number
        required: true // Campo requerido
    },
    priceProduct: {
        type: Number, // Tipo de dato Number
        required: true // Campo requerido
    },
    descriptionProduct: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Elimina espacios en blanco al inicio y al final
    },
    creationDateProduct: {
        type: Date, // Tipo de dato Date
        default: Date.now // Valor por defecto es la fecha y hora actual
    },
    statusProduct: {
        type: Boolean, // Tipo de dato Boolean
        default: true // Valor por defecto es true
    }
});

// Exporta el modelo de producto basado en el esquema definido
export default moongose.model('Product', productSchema);