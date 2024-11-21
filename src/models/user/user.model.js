import mongoose from 'mongoose'; // Importa Mongoose para definir el esquema y el modelo

// Define el esquema de usuario
const userSchema = new mongoose.Schema({
    idTypeUser: {
        type: mongoose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'TypeUser', // Referencia al modelo TypeUser
        required: true // Campo requerido
    },
    username: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Elimina espacios en blanco al inicio y al final
    },
    email: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Elimina espacios en blanco al inicio y al final
    },
    password: {
        type: String, // Tipo de dato String
        required: true // Campo requerido
    },
    status: {
        type: Boolean, // Tipo de dato Boolean
        default: true // Valor por defecto es true
    }
});

// Exporta el modelo de usuario basado en el esquema definido
export default mongoose.model('User', userSchema);