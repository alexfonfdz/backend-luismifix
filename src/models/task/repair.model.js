import moongose from 'mongoose'; // Importa Mongoose para definir el esquema y el modelo

// Define el esquema de reparación
const repairSchema = new moongose.Schema({
    idUser: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'User', // Referencia al modelo User
        required: true // Campo requerido
    },
    idTypeStatusRepair: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'TypeStatusRepair', // Referencia al modelo TypeStatusRepair
        required: true // Campo requerido
    },
    idClient: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'Client', // Referencia al modelo Client
        required: true // Campo requerido
    },
    idTypeEmergency: {
        type: moongose.Schema.Types.ObjectId, // Tipo de dato ObjectId de Mongoose
        ref: 'TypeEmergency', // Referencia al modelo TypeEmergency
        required: true // Campo requerido
    },
    priceRepair: {
        type: Number, // Tipo de dato Number
        required: true // Campo requerido
    },
    noteRepair: {
        type: String, // Tipo de dato String
        required: true // Campo requerido
    },
    orderDate: {
        type: Date, // Tipo de dato Date
        required: true // Campo requerido
    },
    startDate: {
        type: Date, // Tipo de dato Date
    },
    finishDate: {
        type: Date, // Tipo de dato Date
    }
});

// Exporta el modelo de reparación basado en el esquema definido
export default moongose.model('Repair', repairSchema);