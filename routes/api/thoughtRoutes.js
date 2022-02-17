const router = require('express').Router();
const {
    allThoughts,
    findOneThought,
    createThought,
    createReaction,
    deleteThought,
    updateThought,
    deleteReaction
} = require('../../controllers/thoughtControllers')

router.route('/').get(allThoughts)
router.route('/:userId').post(createThought);
router.route('/:thoughtId').get(findOneThought).delete(deleteThought).put(updateThought).patch(updateThought)
router.route('/:thoughtId/reaction').post(createReaction)
router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction)

module.exports = router;
