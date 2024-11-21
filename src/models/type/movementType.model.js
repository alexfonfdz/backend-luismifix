import moongose from 'mongoose'; // Importa Mongoose para definir el esquema y el modelo

// Define el esquema de tipo de movimiento
const movementTypeSchema = new moongose.Schema({
    nameMovementType: {
        type: String, // Tipo de dato String
        required: true, // Campo requerido
        trim: true // Elimina espacios en blanco al inicio y al final
    }
});

// Exporta el modelo de tipo de movimiento basado en el esquema definido
export default moongose.model('MovementType', movementTypeSchema);