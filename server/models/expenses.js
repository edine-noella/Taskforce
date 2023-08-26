'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expenses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        
        Expenses.belongsTo(models.ExpensesSubCategories, {
          foreignKey: 'id',
          as: 'ExpensesSubCategories',         
        });

        Expenses.belongsTo(models.ExpensesCategories, {
          foreignKey: 'id',
          as: 'ExpensesCategories',
        });
    }
  }
  Expenses.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    amount:{
     type: DataTypes.INTEGER,
      allowNull: false,
      field: 'amount'
    },    
    ExpensesCategoriesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ExpensesCategoriesId',
      references: {
        model: 'ExpensesCategories',
        key: 'id'
      }
    },
    ExpensesSubCategoriesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'ExpensesSubCategoriesId',
      references: {
        model: 'ExpensesSubCategories',
        key: 'id'
      }
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
        fields: ['amount']
      },
    ],
    sequelize,
    modelName: 'Expenses',
  });
  return Expenses;
};