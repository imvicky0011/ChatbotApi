const router = require("express").Router()

const {getAllEnduser, getEnduser, createEnduser, updateEnduser, deleteEnduser} = require("../Controllers/EnduserControllers.js")


//defining the mapping of the endpoints
router.get("/", getAllEnduser)

router.get("/:enduserId", getEnduser)

router.post("/", createEnduser)

router.put("/:enduserId", updateEnduser)

router.delete("/:enduserId", deleteEnduser)

module.exports = router