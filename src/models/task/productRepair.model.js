import moongose from 'mongoose';

const productRepairSchema = new moongose.Schema({
    idProduct: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    idRepair: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Repair',
        required: true
    },
    amountProduct: {
        type: Number,
        required: true
    },
    totalPriceProduct: {
        type: Number,
        required: true
    }
});

export default moongose.model('ProductRepair', productRepairSchema);