const { User, Thought } = require('../models');

module.exports = {
    async addThoughts(req, res) {
        console.log('You are adding a new Thought');
        console.log(req.body);
        try {
        const addUserThought = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { thoughts: req.body } },
          { runValidators: true, new: true },
        )
            !addUserThought
              ? res.status(404).json({ message: 'No student found with that ID :(' })
              : res.json(addUserThought)
          }
        catch(err) {
            
        res.status(500).json(err);
      }
},
}
