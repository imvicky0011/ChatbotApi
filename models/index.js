"use strict"
const dbConfig = require("../config/db-config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: dbConfig.dialect,
  storage: dbConfig.database
});

const db = {}

db.sequelize = sequelize
db.models = {}
console.log("HERE")
// Define User, Chatbot, Enduser, and Conversation models
const User = require("./user")(sequelize, Sequelize.DataTypes)
const Chatbot = require("./chatbot")(sequelize, Sequelize.DataTypes)
const Enduser = require("./enduser")(sequelize, Sequelize.DataTypes)
const Conversation = require("./conversation")(sequelize, Sequelize.DataTypes);

console.log(User)
// Define associations
// User.hasMany(Chatbot); // User has many Chatbots
Chatbot.belongsTo(User, { foreignKey: "userId" }); // Chatbot belongs to a User

// A Conversation belongs to a Chatbot
Conversation.belongsTo(Chatbot, { foreignKey: 'chatbotId', onDelete: 'CASCADE' });

// A Conversation belongs to an EndUser

// An EndUser can have many Conversations
Enduser.hasMany(Conversation, { foreignKey: 'endUserId', onDelete: 'CASCADE' });

// Assign models to the db object
db.models.User = User;
db.models.Chatbot = Chatbot;
db.models.Enduser = Enduser;
db.models.Conversation = Conversation;

module.exports = db;
