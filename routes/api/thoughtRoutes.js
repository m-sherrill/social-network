const router = require('express').Router();
const { route } = require('.');
const {
    allThoughts,
    findOneThought,
    createThought,
    createReaction
} = require('../../controllers/thoughtControllers')

router.route('/').get(allThoughts)
router.route('/:userId/').post(createThought);
router.route('/:thoughtId').get(findOneThought)
router.route('/:thoughtId/reaction').post(createReaction)

module.exports = router;
