'use strict';
module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define(
    "Checkin",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
        },
      },
      beerId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
          min: 1,
          max: 5,
        },
      },
      comment: DataTypes.TEXT,
    },
    {}
  );
  Checkin.associate = function(models) {
    // associations can be defined here
    Checkin.belongsTo(models.User, {foreignKey: "userId"});
    Checkin.belongsTo(models.Beer, {foreignKey: "beerId"});

  };
  return Checkin;
};