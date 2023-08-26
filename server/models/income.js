'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Income.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
    incomeName: {
       type: DataTypes.STRING,
        allowNull: false,
        field: 'incomeName'
      },
    amount:{
       type: DataTypes.INTEGER,
        allowNull: false,
        field: 'amount'

      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'createdAt',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedAt',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
  }, {
    timestamps: true,
    indexes: [
      {
        name: 'search',
        fields: ['incomeName', 'amount']
      },
    ],
    sequelize,
    modelName: 'Income',
    tableName: 'Incomes',
  });
  return Income;
};