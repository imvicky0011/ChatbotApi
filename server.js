const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const UserRoutes = require("./Routes/UserRoutes")
const ChatbotRoutes = require("./Routes/ChatbotRoutes")

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    await db.sequelize.sync({sync: true});
    console.log("Database synced successfully");

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  
  } catch (err) {
    console.error("Error syncing database:", err);
  }
})();

// Define your routes here
app.use("/users", UserRoutes)
app.use("/chatbots", ChatbotRoutes)

app.get("/", async (req, res) => {
  try {
    res.send("Welcome to the server!");
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
});
