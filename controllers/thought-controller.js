const { Thought, User } = require('../models');

const thoughtController = {

    getAllThought(req, res) {
        Thought.find({})
        
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })

        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

  // add thought to User
    addThought({ params, body }, res) {
        console.log(params);
        Thought.create(body)

        .then(({ _id }) => {
            return User.findOneAndUpdate(
            { _id: params.UserId },
            { $push: { thoughts: _id } },
            { new: true }
            );
        })

        .then(dbUserData => {
            console.log(dbUserData);
            if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // add reply to thought
    addReply({ params, body }, res) {
        Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { replies: body } },
        { new: true, runValidators: true }
        )

        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // remove thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })

        .then(deletedThought => {
            if (!deletedThought) {
            return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
            { _id: params.UserId },
            { $pull: { thoughts: params.thoughtId } },
            { new: true }
            );
        })

        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // HOW DO I HANDLE THE REACTION?
    // removeReaction({ params }, res) {
    //     Thought.findOneAndUpdate(
    //     { _id: params.thoughtId },
    //     { $pull: { reactions: { ReactionId: params.ReactionId } } },
    //     { new: true }
    //     )
        
    //     .then(dbUserData => res.json(dbUserData))
    //     .catch(err => res.json(err));
    // }   
};

module.exports = thoughtController;


// TO DO ON PROJECT


// SEE API ROUTES
//WHAT ARE THE FRIENDS? FRIENDS CONNECT TO API USER-ROUTES?
//HOW DO THE REACTION INTERACT WITH THE THOUGHT MODEL?


// CONTROLLER NAMES FOR BOTH USER AND THOUGHT CORRECT? -------YES 13 JUN-----
// NEED TO FINISH METHODS IN CONTROLLERS
//NEED TO ADD THE METHODS IN THOUGHT-ROUTES
//POST 13 VIDEO ON YOUTUBE
