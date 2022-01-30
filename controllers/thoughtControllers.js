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
    console.log(oneThought)
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
    console.log(newThought)
    const updateUser = await  User.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { thoughts: newThought._id }},
          { new: true }
        )
    console.log(updateUser)
        !updateUser
        ? res.status(404).json({ message: 'No such user exists' })
        : res.json("Thought Added")
    } catch(error)  {
      console.log(error);
      res.status(500).json(error);
    }
},


// creating a new thought /api/thoughts/thoughtId/reactions
async createReaction(req, res) {
  try {
    const addReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions:  req.body }},
      { new: true, runValidators: true }
      )
      console.log(addReaction)
      !addReaction
      ? res.status(404).json({ message: 'No such thought exists' })
      : res.json("Reaction Added")
    } catch(error)  {
      console.log(error);
      res.status(500).json(error);
    }
}
}