import moongose from 'mongoose';

const historyPurchasesSchema = new moongose.Schema({
    idPurchase: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Purchase',
        required: true
    },
    idMovementType: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'MovementType',
        required: true
    },
    idUser: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateMovement: {
        type: Date,
        default: Date.now()
    }
});

export default moongose.model('HistoryPurchases', historyPurchasesSchema);