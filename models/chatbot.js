module.exports = (sequelize, DataTypes) => {
  const Chatbot = sequelize.define('Chatbot', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    }
  },
    {
      freezeTableName: "User"
    }
  );

  return Chatbot;
};