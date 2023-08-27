import dotenv from 'dotenv';
import { Op } from 'sequelize';
import db from '../../models/index'

dotenv.config();

const { Expenses } = db;

class ExpensesClass{
   
    //function to create expenses
    static async createExpenses(req, res) {
        const { amount , ExpensesCategoriesId, ExpensesSubCategoriesId} = req.body;
        try {
            const newExpenses = await Expenses.create({
                amount,
                ExpensesCategoriesId,
                ExpensesSubCategoriesId
            });
            return res.status(201).json({
                status: 201,
                message: 'Expenses created successfully',
                data: newExpenses
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Internal server error',
                error: error.message
            });
        }
    }

    //function to get all expenses include the categories description attribute and sub categories description attribute
    static async getAllExpenses(req, res) {
        try {
            const allExpenses = await Expenses.findAll({
                include: [
                    {
                        model: db.ExpensesCategories,
                        as: 'ExpensesCategories',
                        attributes: ['categoryName','description']
                    },
                    {
                        model: db.ExpensesSubCategories,
                        as: 'ExpensesSubCategories',
                        attributes: ['subCategoryName','description']
                    }
                ]
            });
            return res.status(200).json({
                status: 200,
                message: 'All expenses',
                data: allExpenses
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Internal server error',
                error: error.message
            });
        }
    }

   

    
  
}

export default ExpensesClass;