const {models: {User, Chatbot} } = require("../models")
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
        const {userId} = req.params
        console.log(userId)
        try {
            const user = await User.findByPk(userId)
            if(!user) {
                return res.status(404).json({
                    message: "User Not Found!"
                })
            }

            return res.status(200).json({
                message: "User Found",
                user: user
            })
        }
        catch(err) {
            return res.status(500).json({
                error: err.message,
                message: "Internal Server Error"
            })
        }
    },

    createUser: async (req, res) => {
        const {username, email} = req.body
        console.log(req.body)

        try {
            const user = await User.create({
                username: username,
                email: email
            })

            res.status(201).json({
                message: "User Created Successfully!",
                user: user
            })
        }
        catch (err) {
            return res.status(500).json({
                error: err,
                message: "Internal Server Error"
            })
        }
    },

    updateUser: async (req, res) => {
        const {userId} = req.params
        const {username, email} = req.body

        try {
            const user = await User.findByPk(userId)
            if(!user) {
                return res.status(404).json({
                    message: "User Not Found"
                })
            }

            user.username = username
            user.email = email

            await user.save()
            res.status(200).json({
                message: "User Updated Successgully!"
            })

        }
        catch(err) {
            res.status(500).json({
                error: err,
                message: "Internal Server Error"
            })
        }
    },

    deleteUser: async (req, res) => {
        const {userId} = req.params
        try {
            const user = await User.findByPk(userId)
            if(!user) {
                return res.status(404).json({
                    message: "User Not Found!"
                })
            }
            console.log(user)
            await user.destroy({
                where: {
                    id: userId
                }
            })
            res.status(201).json({
                message: "User Removed Successfully!"
            })
        }
        catch(err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err
            })
        }
    },

    createChatbot: async (req, res) => {
        const {userId} = req.params
        const {name} = req.body
        try {
            const user = await User.findByPk(userId)

            if(!user) {
                return res.status(404).json({
                    message: "User could not be found with associated userId"
                })
            }

            const chatbot = await Chatbot.create({
                name: name,
                userId: userId
            })

            res.status(201).json({
                message: "Chatbot created Successfully!",
                chatbot: chatbot
            })
        }
        catch(err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err
            })
        }
    },

    getAllChatbots: async (req, res) => {
        const {userId} = req.params
        try {
            const chatbots = await Chatbot.findAll({
                where: {
                    userId: userId,
                }
            })

            res.status(200).json({
                message: "All chatbots fetched",
                chatbots: chatbots
            })
        }
        catch (err) {
            res.status(500).json({
                error: err,
                message: "Internal Server Error"
            })
        }
    }

}

module.exports = UserControllers