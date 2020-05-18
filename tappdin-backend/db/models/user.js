'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true,
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true,
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      validate: {
        notEmpty: true,
      }
    },
    photo: DataTypes.STRING,
    firstName: {
      type: DataTypes.STRING.BINARY,
      validate: {
        notEmpty: true,
      }
    },
    lastName: {
      type: DataTypes.STRING.BINARY,
      validate: {
        notEmpty: true,
      }
    },
    aboutYou: DataTypes.TEXT
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Checkin, {foreignKey: "userId"})
  };
  return User;
};