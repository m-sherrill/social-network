const { Thought, User} = require('../models');

module.exports = {
    //find all users 
    async findAllUsers(req, res) {
        const allUsers = await User.find()
        res.json(allUsers)
    },

    async addUser(req, res) {
        const addUser = await User.create(req.body)
        res.json(addUser)
    },

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

    async deleteUser(req, res) {
        
        try {
            const deleteUser = await User.findOneAndRemove({ _id: req.params.userId })
            !deleteUser
              ? res.status(404).json({ message: 'No such user exists' })
              : res.json("User Deleted")
        }
          catch(err)  {
            console.log(err);
            res.status(500).json(err);
          };
      },

     
}