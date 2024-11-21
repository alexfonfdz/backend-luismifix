import moongose from 'mongoose'; // Importa Mongoose para definir el esquema y el modelo

// Define el esquema de tipo de proveedor
const typeProviderSchema = new moongose.Schema({
    nameTypeProvider: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Elimina espacios en blanco al inicio y al final
    }
});

// Exporta el modelo de tipo de proveedor basado en el esquema definido
export default moongose.model('TypeProvider', typeProviderSchema);