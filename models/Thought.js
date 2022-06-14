const {Schema, model} = require(`mongoose`);
const moment = require(`moment`);
//https://momentjs.com/docs/

const ReactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            maxlength: 280
        },

        createdAt: {
            type: Date,
            default: Date.now,
    //USE A GETTER METHOD TO FORMAT THE TIMESTAMP ON QUERY
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        //this is the user that created the thought
        username: {
            type: String,
            required: true

        },
        reactions:{
            type: [ReactionSchema]
    // THIS NEEDS TO CONNECT TO THE REACTION.JS 
        }
    }, 
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
    
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;

// Schema Settings

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.