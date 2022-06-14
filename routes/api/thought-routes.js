const router = require('express').Router();

const {
    addThought,
    addReply,
    removeThought,
    removeReply
} = require('../../controllers/thought-controller')

module.exports = router;
