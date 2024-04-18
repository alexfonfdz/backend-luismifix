import moongose from 'mongoose';

const historyProductSchema = new moongose.Schema({
    idProduct: {
        type: moongose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    idMovementType: {
        type: moongose.Schema.Types.ObjectId,
        required: true,
        ref: 'MovementType'
    },
    idUser: {
        type: moongose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    dateMovement: {
        type: Date,
        default: Date.now()
    }
});

export default moongose.model('HistoryProduct', historyProductSchema);