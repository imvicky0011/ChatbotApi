const { Sequelize } = require("../models")

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "my-database.db"
})

console.log("lund")

const User = require("../models/user")(sequelize)
// const {getAllUser, getUserbyId, createUser, updateUser, deleteUser} = require("../Controllers/UserControllers")

const UserControllers = {
    getAllUser: async (req, res) => {
        console.log("here is me!")
        // console.log(User)
        console.log(typeof(User))
        try {
            const users = await User.findAll()
            res.status(200).json({
                message: "All users fetched",
                users: users
            })
        }
        catch(err) {
            res.status(500).json({
                error: err.message,
                message: "Internal Server Error"
            })
        }
    },

    getUserbyId: async (req, res) => {

    },

    createUser: async (req, res) => {

    },

    updateUser: async (req, res) => {

    },

    deleteUser: async (req, res) => {

    }
}

module.exports = UserControllers