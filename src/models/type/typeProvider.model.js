import moongose from 'mongoose';

const typeProviderSchema = new moongose.Schema({
    nameTypeProvider: {
        type: String,
        required: true,
        trim: true
    }
});

export default moongose.model('TypeProvider', typeProviderSchema);