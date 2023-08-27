const {models: {Enduser ,User, Chatbot} } = require("../models")

// const {getAllEnduser, getEnduser, createEnduser, updateEnduser, deleteEnduser} = require("../Controllers/EnduserControllers")

const EnduserControllers = {
    getAllEnduser: async (req, res) => {
        try {
            const endusers = await Enduser.findAll()
            res.status(200).json({
                message: "All users fetched",
                endusers: endusers
            })
        }
        catch(err) {
            res.status(500).json({
                error: err.message,
                message: "Internal Server Error"
            })
        }
    },

    getEnduser: async (req, res) => {
        const {enduserId} = req.params
        console.log(enduserId + " here i am")
        try {
            const enduser = await Enduser.findByPk(enduserId)
            if(!enduser) {
                return res.status(404).json({
                    message: "User Not Found!"
                })
            }

            return res.status(200).json({
                message: "Enduser Found",
                enduser: enduser
            })
        }
        catch(err) {
            return res.status(500).json({
                error: err.message,
                message: "Internal Server Error"
            })
        }
    },

    createEnduser: async (req, res) => {
        const {username, email} = req.body
        console.log(req.body)

        try {
            const enduser = await Enduser.create({
                username: username,
                email: email
            })

            res.status(201).json({
                message: "User Created Successfully!",
                enduser: enduser
            })
        }
        catch (err) {
            return res.status(500).json({
                error: err,
                message: "Internal Server Error"
            })
        }
    },

    updateEnduser: async (req, res) => {
        const {enduserId} = req.params
        const {username, email} = req.body

        try {
            const enduser = await Enduser.findByPk(enduserId)
            if(!enduser) {
                return res.status(404).json({
                    message: "User Not Found"
                })
            }

            enduser.username = username
            enduser.email = email

            await enduser.save()
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

    deleteEnduser: async (req, res) => {
        const {enduserId} = req.params
        try {
            const enduser = await Enduser.findByPk(enduserId)
            if(!enduser) {
                return res.status(404).json({
                    message: "User Not Found!"
                })
            }
            console.log(enduser)
            await Enduser.destroy({
                where: {
                    id: enduserId
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
}

module.exports = EnduserControllers