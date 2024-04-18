import moongose from 'mongoose';

const historyProviderSchema = new moongose.Schema({
    idProvider: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Provider',
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

export default moongose.model('HistoryProvider', historyProviderSchema);