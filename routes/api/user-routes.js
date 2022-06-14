const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,

} = require('../../controllers/user-controller');

// Sets up GET all and POST at /api/user
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

    // Sets up GET one, PUT, and DELETE at /api/user/:id
router
    .route('./:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;