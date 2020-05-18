'use strict';
module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define('Checkin', {
    userId: DataTypes.INTEGER,
    beerId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  Checkin.associate = function(models) {
    // associations can be defined here
    Checkin.belongsTo(models.User, {foreignKey: "userId"});
    Checkin.belongsTo(models.Beer, {foreignKey: "beerId"});

  };
  return Checkin;
};