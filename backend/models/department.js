const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('department', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    }
  });
};
