import moongose from 'mongoose';

const imageProductSchema = new moongose.Schema({
    idProduct: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    idUser: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productImage: {
        type: Buffer,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default moongose.model('ImageProduct', imageProductSchema);