import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    idTypeUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TypeUser',
        required: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('User', userSchema);