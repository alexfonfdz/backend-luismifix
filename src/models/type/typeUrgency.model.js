import mongoose from 'mongoose'; // Importa Mongoose para definir el esquema y el modelo

// Define el esquema de tipo de urgencia
const typeUrgencySchema = new mongoose.Schema({
    nameTypeUrgency: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Elimina espacios en blanco al inicio y al final
    }
});

// Exporta el modelo de tipo de urgencia basado en el esquema definido
export default mongoose.model('TypeUrgency', typeUrgencySchema);