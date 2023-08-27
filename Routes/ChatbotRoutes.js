const router = require("express").Router()

const {getAllConversations, deleteMyChatbot, updateMyChatbot, getMyChatbot, createConversation} = require("../Controllers/ChatBotController")


router.get("/:chatbotId", getMyChatbot)

router.put("/:chatbotId", updateMyChatbot)

router.delete("/:chatbotId", deleteMyChatbot)

router.post("/:chatbotId/conversations", createConversation)

router.get("/:chatbotId/conversations", getAllConversations)

module.exports = router