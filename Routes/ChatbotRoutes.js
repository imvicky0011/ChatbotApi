const router = require("express").Router()

const {deleteMyChatbot, updateMyChatbot, getMyChatbot} = require("../Controllers/ChatBotController")

router.get("/:chatbotId", getMyChatbot)

router.put("/:chatbotId", updateMyChatbot)

router.delete("/:chatbotId", deleteMyChatbot)

module.exports = router