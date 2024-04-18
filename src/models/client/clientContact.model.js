import moongose from 'mongoose';

const clientContactSchema = new moongose.Schema({
    idTypeContact: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'TypeContact',
        required: true
    },
    idClient: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    data: {
        type: String,
        required: true,
        trim: true
    }
});

export default moongose.model('ClientContact', clientContactSchema);