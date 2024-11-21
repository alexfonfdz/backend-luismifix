import moongose from 'mongoose'; // Importa Mongoose para definir el esquema y el modelo

// Define el esquema de contacto de proveedor
const providerContactSchema = new moongose.Schema({
    idTypeContact: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'TypeContact', // Referencia al modelo TypeContact
        required: true // Campo requerido
    },
    idProvider: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'Provider', // Referencia al modelo Provider
        required: true // Campo requerido
    },
    data: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Elimina espacios en blanco al inicio y al final
    },
    statusContact: {
        type: Boolean, // Tipo de dato Boolean
        default: true, // Valor por defecto es true
    }
});

// Exporta el modelo de contacto de proveedor basado en el esquema definido
export default moongose.model('ProviderContact', providerContactSchema);