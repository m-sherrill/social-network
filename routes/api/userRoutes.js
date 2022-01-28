const router = require('express').Router();
const {
    findAllUsers,
    addUser,
    deleteUser,
    addThoughts
} = require('../../controllers/userController')

router.route('/').get(findAllUsers).post(addUser)
router.route('/:userId').delete(deleteUser);
router.route('/:userId/thoughts').post(addThoughts);

module.exports = router;
