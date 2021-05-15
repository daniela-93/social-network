const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  removeThought,
  updateThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

// /api/thoughts/<thoughtId>
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .delete(removeThought)
    .put(updateThought);

// /api/thoughts/<thoughtId>/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction)

// /api/thoughts/<thoughtId>/<reactionId>
router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;