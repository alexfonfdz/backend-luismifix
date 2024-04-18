import moongose from 'mongoose';

const repairSchema = new moongose.Schema({
    idUser: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    idTypeStatusRepair: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'TypeStatusRepair',
        required: true
    },
    idClient: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    idTypeEmergency: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'TypeEmergency',
        required: true
    },
    priceRepair: {
        type: Number,
        required: true
    },
    noteRepair: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    startDate: {
        type: Date,
    },
    finishDate: {
        type: Date,
    }
});

export default moongose.model('Repair', repairSchema);