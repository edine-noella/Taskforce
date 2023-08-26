'use strict';
const {
  Model
} = require('sequelize');
const expensescategories = require('./expensescategories');
module.exports = (sequelize, DataTypes) => {
  class ExpensesSubCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ExpensesSubCategories.belongsTo(models.ExpensesCategories, {
        foreignKey: 'id',
        as: 'ExpensesCategories',
       
      });

      ExpensesSubCategories.hasMany(models.Expenses, {
        foreignKey: 'id',
        as: 'Expenses',
        sourceKey: 'id'
       
      });   

      
    }
  }
  ExpensesSubCategories.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    subCategoryName: {
     type: DataTypes.STRING,
      allowNull: false,
      field: 'subCategoryName'
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'description'
    }
  }, {

    sequelize,
    modelName: 'ExpensesSubCategories',
    tableName: 'ExpensesSubCategories',
  });
  return ExpensesSubCategories;
};