const router = require('express').Router();
const {
    allThoughts,
    findOneThought,
    createThought,
    createReaction,
    deleteThought
} = require('../../controllers/thoughtControllers')

router.route('/').get(allThoughts)
router.route('/:userId/').post(createThought);
router.route('/:thoughtId').get(findOneThought).delete(deleteThought)
router.route('/:thoughtId/reaction').post(createReaction)

module.exports = router;
