module.exports = (sequelize, DataTypes) => {
  const Chatbot = sequelize.define('Chatbot', {
  },
    {
      freezeTableName: "User"
    }
  );

  return Chatbot;
};