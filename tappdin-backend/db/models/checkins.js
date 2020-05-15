'use strict';
module.exports = (sequelize, DataTypes) => {
  const Checkins = sequelize.define('Checkins', {
    userId: DataTypes.INTEGER,
    beerId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  Checkins.associate = function(models) {
    // associations can be defined here
  };
  return Checkins;
};