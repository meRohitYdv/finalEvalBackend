'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  content.init({
    contentName: DataTypes.STRING,
    contentFields: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'content',
  });
  return content;
};