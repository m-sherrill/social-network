const { User, Thought } = require('../models');

module.exports = {

  // find all thoughts .. path of /api/thoughts
  async allThoughts(req, res) {
    try{
      const findThoughts = await Thought.find()
        res.json(findThoughts)
    } catch(error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // find a thought by a single id .. path of /api/thoughts/thoughtID
  async findOneThought(req, res) {
    try{
    const oneThought = await Thought.findOne({ _id: req.params.thoughtId })
        !oneThought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(oneThought)
    } catch(error) {
      console.log(error)
      res.status(500).json(error)
    } 
  },

  // creating a new thought /api/thoughts/userID
  async createThought(req, res) {
  try {
    const findUser = await User.findById({ _id: req.params.userId })
    let username = findUser.username
    const newThought = await Thought.create({
      thoughtText: req.body.thoughtText,
         username: username,
    })
    const updateUser = await  User.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { thoughts: newThought._id }},
          { new: true }
        )
        !updateUser
        ? res.status(404).json({ message: 'No such user exists' })
        : res.json("Thought Added")
    } catch(error)  {
      console.log(error);
      res.status(500).json(error);
    }
},

// update a thought using put -- req.body would look for thoughtText -- path /api/thoughts/:thoughtID/:userID
async updateThought(req, res) {
  try {
      const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
      );
      !thought
        ? res.status(404).json({ message: 'No such user exists' })
        : res.json("Thought Added")
  } catch (err) {
      res.status(500).json({ message: err });
  }
},


// delete thought by ID ... path /api/thoughts/:thoughtID
async deleteThought(req, res) {
  try {
      const deleteThought = await Thought.findOneAndRemove({ _id: req.params.thoughtId })
      !deleteThought
        ? res.status(404).json({ message: 'No such thought exists' })
        : res.json("Thought Deleted")
  }
    catch(err)  {
      console.log(err);
      res.status(500).json(err);
    };
},

// creating a new thought /api/thoughts/thoughtId/reactions -- req.body needs reactionText and username
async createReaction(req, res) {
  try {
    const addReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions:  req.body }},
      { new: true, runValidators: true }
      )
      !addReaction
      ? res.status(404).json({ message: 'No such thought exists' })
      : res.json("Reaction Added")
    } catch(error)  {
      console.log(error);
      res.status(500).json(error);
    }
},

// Deleting a new thought /api/thoughts/thoughtId/reactions -- 
async deleteReaction(req, res) {
  try {
    const deleteReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions:  req.params.reactionId }},
      { new: true, runValidators: true }
      )
      !deleteReaction
      ? res.status(404).json({ message: 'No such thought exists' })
      : res.json("Reaction Deleted")
    } catch(error)  {
      console.log(error);
      res.status(500).json(error);
    }
},
}