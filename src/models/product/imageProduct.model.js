import moongose from 'mongoose'; // Importa Mongoose para definir el esquema y el modelo

// Define el esquema de imagen de producto
const imageProductSchema = new moongose.Schema({
    idProduct: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'Product', // Referencia al modelo Product
        required: true // Campo requerido
    },
    idUser: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'User', // Referencia al modelo User
        required: true // Campo requerido
    },
    productImage: {
        type: Buffer, // Tipo de dato Buffer para almacenar la imagen
        required: true // Campo requerido
    },
    date: {
        type: Date, // Tipo de dato Date
        default: Date.now // Valor por defecto es la fecha y hora actual
    }
});

// Exporta el modelo de imagen de producto basado en el esquema definido
export default moongose.model('ImageProduct', imageProductSchema);