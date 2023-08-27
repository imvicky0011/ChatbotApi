const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const UserRoutes = require("./Routes/UserRoutes")
const ChatbotRoutes = require("./Routes/ChatbotRoutes")
const EnduserRoutes = require("./Routes/EnduserRoutes");
const ConversationRoutes = require("./Routes/ConversationRoutes")
const passport = require("passport")

var cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookies) {
      token = req.cookies;
  }
  return token;
}

var JwtStrategy = require('passport-jwt').Strategy
var opts = {}

opts.jwtFromRequest = cookieExtractor;

opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
// ...
opts.jwtFromRequest = cookieExtractor;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  try {
    await db.sequelize.sync();
    
    console.log(typeof(db.models.Chatbot))
   
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
app.use("/endusers", EnduserRoutes)
app.use("/conversation", ConversationRoutes)

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
