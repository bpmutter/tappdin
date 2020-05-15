'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    name: DataTypes.STRING,
    beerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {});
  List.associate = function(models) {
    // associations can be defined here
  };
  return List;
};