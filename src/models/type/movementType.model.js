import moongose from 'mongoose';

const movementTypeSchema = new moongose.Schema({
    nameMovementType: {
        type: String,
        required: true,
        trim: true
    }
});

export default moongose.model('MovementType', movementTypeSchema);