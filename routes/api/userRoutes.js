const router = require('express').Router();
const {
    findAllUsers,
    addUser,
    findUser,
    deleteUser,
    createFriend,
    deleteFriend
} = require('../../controllers/userController')

router.route('/').get(findAllUsers).post(addUser)
router.route('/:userId').get(findUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(createFriend).delete(deleteFriend)


module.exports = router;
