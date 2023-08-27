//this routes could be access by the user as well enduser
//enduser could create a conversation with a chatbot
//that chatbot will be published by the user

const { deleteConversation, updateConversation, getConversation } = require("../Controllers/ConversationController")

//and enduser could interact with them as of now this is the structure
const router = require("express").Router()

router.get("/:conversationId", getConversation)

router.put("/:conversationId", updateConversation)

router.delete("/:conversationId", deleteConversation)

module.exports = router