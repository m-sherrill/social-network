const { User, Thought } = require('../models');

module.exports = {
    //find all users 
    async findAllUsers(req, res) {
        const query = await User.find()
        console.log(query)
    },

    async addUser(req, res) {
        const addUser = await User.create(req.body)
    }
}