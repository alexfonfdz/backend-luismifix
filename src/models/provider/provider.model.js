import moongose from 'mongoose';

const providerSchema = new moongose.Schema({
    idTypeProvider: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'TypeProvider',
        required: true
    },
    nameProvider: {
        type: String,
        required: true,
        trim: true
    },
    noteProvider: {
        type: String,
        trim: true
    },
    creationDateProvider: {
        type: Date,
        default: Date.now()
    },
    statusProvider: {
        type: Boolean,
        default: true
    }
});

export default moongose.model('Provider', providerSchema);