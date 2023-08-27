module.exports = (sequelize, DataTypes) => {

    const Enduser = sequelize.define('Enduser', 
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
    },
  
      {
        freezeTableName: "Enduser"
      }
  
    );
  
    
    return Enduser;
  };