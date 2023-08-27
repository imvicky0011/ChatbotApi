const {models: {User, Chatbot} } = require("../models")
const chatbot = require("../models/chatbot")

// const {deleteMyChatbot, updateMyChatbot, getMyChatbot} = require("../Controllers/ChatBotController")


const ChatBotController = {
    getMyChatbot: async (req, res) => {
        //this router is => "/chatbots/:chatbotId"
        //here is no userId provided in the api route
        //so you will have to extract from the cookies
        //as of now, you will manually send the userId in req.body
        //to mimick the authentication
        const {userId} = req.body
        const {chatbotId} = req.params
        console.log(userId, chatbotId)
        try {
            const chatbot = await Chatbot.findByPk(chatbotId)
            if(!chatbot) {
                return res.status(400).json({
                    message: "Chatbot not found!"
                })
            }

            const stringUserId = String(userId).trim();
            const chatbotUserId = String(chatbot.dataValues.userId);
            
            //we do not need this, we want to allow the end users to fetch the chatbot
            //and its conversation with them
            // if(chatbotUserId !== stringUserId) {
            //     return res.status(404).json({
            //         message: "Unauthorized, Access Denied!"
            //     })
            // } 

            res.status(200).json({
                message: "Chatbot Fetched Successfully!",
                chatbot: chatbot
            })
        
        }
        catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err
            })
        }
    },

    deleteMyChatbot: async (req, res) => {
        const {userId} = req.body
        const {chatbotId} = req.params
        console.log(userId, chatbotId)
        try {
            const chatbot = await Chatbot.findByPk(chatbotId)
        
        
            if(!chatbot) {
                return res.status(400).json({
                    message: "Chatbot not found!"
                })
            }

            const stringUserId = String(userId).trim();
            const chatbotUserId = String(chatbot.dataValues.userId);

            if(chatbotUserId !== stringUserId) {
                return res.status(404).json({
                    message: "Unauthorized, Access Denied!"
                })
            }

            //if we have reached this point, this means that we have
            //successfully authorized out selves to delete the chatbot
            //with respective chatbotId
            await Chatbot.destroy({
                where: {
                    id : chatbot.id
                }
            })

            res.status(200).json({
                message: "Chatbot Fetched Successfully!",
                chatbot: chatbot
            })
        }
        catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err
            })
        }
    },

    updateMyChatbot: async (req, res) => {
        const {userId} = req.body
        const {chatbotId} = req.params
        console.log(userId, chatbotId)
        try {
            const chatbot = await Chatbot.findByPk(chatbotId)
        
            if(!chatbot) {
                return res.status(400).json({
                    message: "Chatbot not found!"
                })
            }

            const stringUserId = String(userId).trim();
            const chatbotUserId = String(chatbot.dataValues.userId);

            if(chatbotUserId !== stringUserId) {
                return res.status(404).json({
                    message: "Unauthorized, Access Denied!"
                })
            }
            
            

            //if we have reached this point, this means that we have
            //successfully authorized out selves to update the chatbot
            //with respective chatbotId
            //do whatever updates you need to do
            await chatbot.save()

            res.status(200).json({
                message: "Chatbot Updated Successfully!",
                chatbot: chatbot
            })
        }
        catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err
            })
        }
    }
}

module.exports = ChatBotController