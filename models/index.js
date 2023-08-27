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

// Define User and Chatbot models and associations
const User = require("./user")(sequelize, Sequelize.DataTypes)
const Chatbot = require("./chatbot")(sequelize, Sequelize.DataTypes)
const Enduser = require("./enduser")(sequelize, Sequelize.DataTypes)

// Define associations
User.hasMany(Chatbot); // User has many Chatbots
Chatbot.belongsTo(User, { foreignKey: "userId" }); // Chatbot belongs to a User

// Assign models to the db object
db.models.User = User;
db.models.Chatbot = Chatbot;
db.models.Enduser = Enduser;

module.exports = db;
