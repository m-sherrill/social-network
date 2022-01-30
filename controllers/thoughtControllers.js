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
}
}
