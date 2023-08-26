const router = require("express").Router()
const {getAllUser, getUserbyId, createUser, updateUser, deleteUser} = require("../Controllers/UserControllers")


//defining the mapping of the endpoints
router.get("/", getAllUser)

router.post("/", createUser)

router.get("/:userId", getUserbyId)

router.put("/:id", updateUser)

router.delete("/:id", deleteUser)

module.exports = router