'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpensesCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       ExpensesCategories.hasMany(models.ExpensesSubCategories, {
          foreignKey: 'id',
          as: 'ExpensesSubCategories',  
          sourceKey: 'id'        
        });

        ExpensesCategories.hasMany(models.Expenses, {
          foreignKey: 'id',
          as: 'Expenses',
          sourceKey: 'id'
        });
    }
  }
  ExpensesCategories.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
      },
    categoryName:{
       type: DataTypes.STRING,
        allowNull: false,
        field: 'categoryName'
      },
    description: {
       type: DataTypes.STRING,
        allowNull: false,
        field: 'description'
      }
  }, {
    indexes: [
      {
        name: 'search',
        fields: ['categoryName', 'description']
      },
    ],
    sequelize,
    modelName: 'ExpensesCategories',
    tableName: 'ExpensesCategories',
  }
  );
  return ExpensesCategories;
};