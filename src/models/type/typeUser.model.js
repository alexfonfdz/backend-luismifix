import mongoose from 'mongoose'; // Importa Mongoose para definir el esquema y el modelo

// Define el esquema de tipo de usuario
const typeUserSchema = new mongoose.Schema({
    nameTypeUser: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Elimina espacios en blanco al inicio y al final
    }
});

// Exporta el modelo de tipo de usuario basado en el esquema definido
export default mongoose.model('TypeUser', typeUserSchema);