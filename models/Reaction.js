const {Schema, model} = require(`mongoose`);
const moment = require('moment');
//https://momentjs.com/docs/

const reactionSchema = new Schema({

    reactionId: {
        type: Schema.Types.ObjectId, 
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm:a')
    }
});

// Schema Settings

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.