import moongose from 'mongoose';

const typeStatusRepairSchema = new moongose.Schema({
    nameTypeStatusRepair: {
        type: String,
        required: true,
        trim: true
    }
});

export default moongose.model('TypeStatusRepair', typeStatusRepairSchema);