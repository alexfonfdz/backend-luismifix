import moongose from 'mongoose';

const productSchema = new moongose.Schema({
    idTypeProduct: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'TypeProduct',
        required: true
    },
    nameProduct: {
        type: String,
        required: true,
        trim: true
    },
    amountProduct: {
        type: Number,
        required: true
    },
    priceProduct: {
        type: Number,
        required: true
    },
    descriptionProduct: {
        type: String,
        required: true,
        trim: true
    },
    creationDateProduct: {
        type: Date,
        default: Date.now
    },
    statusProduct: {
        type: Boolean,
        default: true
    }
});

export default moongose.model('Product', productSchema);