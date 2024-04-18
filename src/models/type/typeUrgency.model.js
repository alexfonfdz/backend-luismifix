import moongose from 'mongoose';

const typeUrgencySchema = new moongose.Schema({
    nameTypeUrgency: {
        type: String,
        required: true,
        trim: true
    }
});

export default moongose.model('TypeUrgency', typeUrgencySchema);