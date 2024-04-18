import moongose from 'mongoose';

const purchaseSchema = new moongose.Schema({
    idProduct: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    idProvider: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true
    },
    linkProvider: {
        type: String,
        required: true
    },
    priceProduct: {
        type: Number,
        required: true
    },
    statusPurchase: {
        type: Boolean,
        default: true
    }
});

export default moongose.model('Purchase', purchaseSchema);