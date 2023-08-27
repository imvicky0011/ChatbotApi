module.exports = (sequelize, DataTypes) => {
  const Chatbot = sequelize.define('Chatbot', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
  },
    {
      freezeTableName: "User"
    }
  );


  return Chatbot;
};