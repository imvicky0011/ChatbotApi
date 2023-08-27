const {models: {User, Chatbot, Enduser, Conversation} } = require("../models")
//this is the controller where end user or user controls everything,
//lets say end user (and the user) has the power to delete/get/update

const ConversationController = {

    deleteConversation: async (req, res) => {
        //if a user requests this delete endpoint, 
        //then the cookie will give me their userId/enduserId
        //if the particular conversation eblogns to the user/enduser
        //then only we will apply the delete operation
        try {
            const {conversationId} = req.params
            
            const conversation = await Conversation.findbyPk(conversationId)

            if(!conversation) {
                return res.status(200).json({
                    message: "Already Does not exists"
                })
            }

            await Conversation.destroy({
                where : {
                    id: conversationId
                }
            })
        }
        catch(err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err
            })
        }
    },

    updateConversation: async (req, res) => {
        //only end user an update the conversations, because it belongs to the enduser
        try {
            const {conversationId} = req.params
            const {enduserId, title, status} = req.body;
            
            const conversation = await Conversation.findAll({
                where: {
                    id: conversationId
                }
            })

            //authorize if the conversation belongs to the enduser

            conversation.title = title,
            conversation.status = status

            await conversation.save()

            res.status(200).json({
                message: "Conversation Updated Successfully",
                conversation: conversation
            })
        }
        catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: err
            })
        } 
    },

    getConversation: async (req, res) => {
        try {
            const {conversationId} = req.params
            const {enduserId} = req.body;
            
            const conversation = await Conversation.findbyPk(conversationId)

            //authorize if the conversation belongs to the enduser
            if(!conversation) {
                return res.status(400).json({
                    message: "Conversation Does not exist"
                })
            }

            res.status(200).json({
                message: "Conversation Fetched Successfully",
                conversation: conversation
            })
        }
        catch (err) {
            res.status(400).json({
                message: "Internal server error",
                error: err
            })
        }
    },
    
}

module.exports = ConversationController