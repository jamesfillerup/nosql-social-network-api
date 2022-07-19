const { Thought, User } = require('../models');

const thoughtController = {

    getAllThought(req, res) {
        Thought.find({})
        
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


        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

  // add thought to User
    addThought({ body }, res) {
        Thought.create(body)

        .then(({ _id }) => {
            return User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: _id } },
            { new: true }
            );
        })

        .then(dbUserData => {
            console.log(dbUserData);
            if (!dbUserData) {
            res.status(404).json({ message: 'No User found with thoughtcontroller!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    updateThought({ params, body}, res){
        Thought.findOneAndUpdate(
            { _id: params.id },
            body, 
            { new: true, runValidators: true })

        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
            }
            res.json(dbUserData);
        })

        .catch(err => res.json(err));
    },


    // delete thought
    deleteThought({ params, body }, res) {
        Thought.findOneAndDelete({ _id: params.id })

        .then(deletedThought => {
            if (!deletedThought) {
            return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
            { _id: body.userId },
            { $pull: { thoughts: params.id } },
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


    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
            )
        
            .then(dbUserData => {
                if (!dbUserData) {
                res.status(404).json({ message: 'No User add reaction found with this id!' });
                return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
        },        


    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
        )
        
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }   
};

module.exports = thoughtController;



