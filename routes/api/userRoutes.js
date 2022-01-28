const router = require('express').Router();
const {
    findAllUsers
} = require('../../controllers/userController')

router.route('/').get(findAllUsers)

module.exports = router;
