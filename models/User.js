const {Schema, model, Types} = require(`mongoose`);

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: [true, 'User email address required'],
            unique: true,
            //http://zparacha.com/validate-email-address-using-javascript-regular-expression
            match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/]
            // validate: { 
            //     validator: function (vali) {
            //         return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(vali);
                //Must match a valid email address (look into Mongoose's matching validation)
        },
        thoughts: [{
            // Array of _id values referencing the Thought model
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
            // prevents virtuals from creating duplicate of _id as `id`
            id: false
    }
);
    //Schema Settings
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
    
});

const User = model('User', UserSchema);

module.exports = User;
