'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class demoTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  demoTable.init({
    demoRow1: DataTypes.STRING,
    demoRow2: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'demoTable',
  });
  return demoTable;
};