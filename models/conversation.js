module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    "Conversation",
    {
      
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      chatbotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },

    {
      freezeTableName: "Conversation",
    }
  );

  return Conversation;
};
