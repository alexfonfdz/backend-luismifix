import moongose from 'mongoose';

const clientSchema = new moongose.Schema({
    nameClient: {
        type: String,
        required: true,
        trim: true
    },
    lastNameClient: {
        type: String,
        required: true,
        trim: true
    },
    secondLastNameClient: {
        type: String,
        trim: true
    }
});

export default moongose.model('Client', clientSchema);