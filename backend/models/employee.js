const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('employee', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    },
    dob: {
      type: DataTypes.DATEONLY
    },
    workTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    experience: {
      type: DataTypes.STRING
    }
  });
};
