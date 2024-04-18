import moongose from 'mongoose';

const typeUserSchema = new moongose.Schema({
    nameTypeUser: {
        type: String,
        required: true,
        trim: true
    }
});

export default moongose.model('TypeUser', typeUserSchema);