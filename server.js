const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const { Sequelize } = require("./models")
const UserRoutes = require("./Routes/UserRoutes")
const UserModel = require("./models/user")


const sequelize = new Sequelize( {
    dialect: "sqlite",
    storage: "my-database.db"
})

const User = UserModel(sequelize)

const app = express()
app.use(cors())
app.use(bodyParser.json())

const syncDB = async  () => {
    await sequelize.sync().then(() => {
        console.log("DB synced")
        //listening to PORT, spinning up the server
        const PORT = process.env.PORT || 3000
        
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    })
}
syncDB()


//now i will define the routes of the incoming apis
app.use("/users",  UserRoutes)
app.get("/", async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json({
            message: "Fetched all users",
            users: users
        })
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err
        })
    }
})