const router = require("express").Router()
const {getAllUser, getUserbyId, createUser, updateUser, deleteUser, createChatbot, getAllChatbots} = require("../Controllers/UserControllers")


//defining the mapping of the endpoints
router.get("/", getAllUser)

router.post("/", createUser)

router.get("/:userId", getUserbyId)

router.put("/:userId", updateUser)

router.delete("/:userId", deleteUser)

router.post("/:userId/chatbots", createChatbot)

router.get("/:userId/chatbots", getAllChatbots)

module.exports = router