import dotenv from 'dotenv';
import { Op } from 'sequelize';
import db from '../../models/index'

dotenv.config();

const { ExpensesCategories } = db;

class ExpensesCategoriesClass{

    //function to create a new expense category
   static async createExpenseCategory(req, res) {
        const { categoryName , description} = req.body;
        try {

            //check if the category name already exists
            const categoryExists = await ExpensesCategories.findOne({
                where: {                 
                    [Op.and]: [{ categoryName }]
                }
            });

            //if category name exists
            if (categoryExists) {
                return res.status(409).json({
                    status: 409,
                    message: 'Category name already exists'
                });
            }

            const newExpenseCategory = await ExpensesCategories.create({
                categoryName,
                description
            });
            return res.status(201).json({
                status: 201,
                message: 'Expense category created successfully',
                data: newExpenseCategory
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Internal server error',
                error: error.message
            });
        }
    }

    //function to get all expense categories
    static async getAllExpenseCategories(req, res) {
        try {
            const allExpenseCategories = await ExpensesCategories.findAll();
            return res.status(200).json({
                status: 200,
                message: 'All expense categories',
                data: allExpenseCategories
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

export default ExpensesCategoriesClass;