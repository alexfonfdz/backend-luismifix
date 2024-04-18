import moongose from 'mongoose';

const typeContactSchema = new moongose.Schema({
    nameTypeContact: {
        type: String,
        required: true,
        trim: true
    }
});

export default moongose.model('TypeContact', typeContactSchema);