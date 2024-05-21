import moongose from 'mongoose';

const providerContactSchema = new moongose.Schema({
    idTypeContact: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'TypeContact',
        required: true
    },
    idProvider: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true
    },
    data: {
        type: String,
        required: true,
        trim: true
    },
    statusContact: {
        type: Boolean,
        default: true,
    }
});

export default moongose.model('ProviderContact', providerContactSchema);