import moongose from 'mongoose';

const typeProductSchema = new moongose.Schema({
    nameTypeProduct: {
        type: String,
        required: true,
        trim: true
    }
});

export default moongose.model('TypeProduct', typeProductSchema);