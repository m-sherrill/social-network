const router = require('express').Router();
const {
    allThoughts,
    createThought
} = require('../../controllers/thoughtControllers')

router.route('/').get(allThoughts)
router.route('/:userId/').post(createThought);

module.exports = router;
