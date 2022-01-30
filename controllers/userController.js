const { Thought, User} = require('../models');

module.exports = {
    //find all users 
    async findAllUsers(req, res) {
        const allUsers = await User.find()
        res.json(allUsers)
    },

    //add a new user
    async addUser(req, res) {
        const addUser = await User.create(req.body)
        res.json(addUser)
    },

    // find one user by ID
    async findUser(req, res) {
      User.findOne({ _id: req.params.userId })
        .then(async (user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json({
                user
              })
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },

    //delete user
    async deleteUser(req, res) {
        try {
            const findUser = await User.findOne({ _id: req.params.userId })
            console.log(findUser)
            const deleteUser = await User.findOneAndRemove({ _id: req.params.userId })
            const deleteThoughts = await Thought.deleteMany({ username: findUser.username })
            !deleteUser && !deleteThoughts
              ? res.status(404).json({ message: 'No such user exists' })
              : res.json("User and Associated Thoughts Deleted")
            
        }
          catch(err)  {
            console.log(err);
            res.status(500).json(err);
          };
      },  
      
      //add a new friend .. path of /api/users/userId/friends/friendId
      async createFriend(req, res) {
        try {
          console.log("IN THE CREATE FRIEND TRY!!!!")
          const addFriend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends:  req.params.friendId }},
            { new: true, runValidators: true }
            )
            console.log(addFriend)
            !addFriend
            ? res.status(404).json({ message: 'No such user exists' })
            : res.json("Friend Added")
          } catch(error)  {
            console.log(error);
            res.status(500).json(error);
          }
      },

      async deleteFriend(req, res) {
        try {
          const deleteFriend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends:  req.params.friendId }},
            { new: true, runValidators: true }
            )
            console.log(deleteFriend)
            !deleteFriend
            ? res.status(404).json({ message: 'No such user exists' })
            : res.json("Friend Deleted")
          } catch(error)  {
            console.log(error);
            res.status(500).json(error);
          }
      },
}