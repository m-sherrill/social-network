const router = require('express').Router();
const { route } = require('.');
const {
    allThoughts,
    findOneThought,
    createThought
} = require('../../controllers/thoughtControllers')

router.route('/').get(allThoughts)
router.route('/:userId/').post(createThought);
router.route('/:thoughtId').get(findOneThought)

module.exports = router;
