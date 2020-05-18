'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    name: DataTypes.STRING,
    beerId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true,
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true,
      }
    },
  }, {});
  List.associate = function(models) {
    // associations can be defined here
    List.belongsTo(models.Beer, {foreignKey: "beerId"});
    List.belongsTo(models.User, {foreignKey: "userId"});
  };
  return List;
};