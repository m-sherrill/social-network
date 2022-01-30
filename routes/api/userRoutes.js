const router = require('express').Router();
const {
    findAllUsers,
    addUser,
    findUser,
    deleteUser
} = require('../../controllers/userController')

router.route('/').get(findAllUsers).post(addUser)
router.route('/:userId').get(findUser).delete(deleteUser);


module.exports = router;
