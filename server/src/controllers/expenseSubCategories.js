import dotenv from 'dotenv';
import { Op } from 'sequelize';
import db from '../../models/index'

dotenv.config();

const { ExpensesSubCategories } = db;

class ExpensesSubCategoriesClass{

    //function to create a new expense sub category with a foreing key of categories
    static async createExpenseSubCategory(req, res) {
        const { subCategoryName , description, ExpensesCategoriesId} = req.body;
        try {

            //check if the sub category name already exists
            const subCategoryExists = await ExpensesSubCategories.findOne({
                where: {                 
                    [Op.and]: [{ subCategoryName }]
                }
            });

            //if sub category name exists
            if (subCategoryExists) {
                return res.status(409).json({
                    status: 409,
                    message: 'Sub category name already exists'
                });
            }

            const newExpenseSubCategory = await ExpensesSubCategories.create({
                subCategoryName,
                description,
                ExpensesCategoriesId
            });
            return res.status(201).json({
                status: 201,
                message: 'Expense sub category created successfully',
                data: newExpenseSubCategory
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Internal server error',
                error: error.message
            });
        }
    }

    //function to get all expense sub categories include the categories
    static async getAllExpenseSubCategories(req, res) {
        try {
            const allExpenseSubCategories = await ExpensesSubCategories.findAll({
                include: [
                    {
                        model: db.ExpensesCategories,
                        as: 'ExpensesCategories',
                        attributes: ['categoryName']
                    }
                ]
            });
            return res.status(200).json({
                status: 200,
                message: 'All expense sub categories retrieved successfully',
                data: allExpenseSubCategories
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

export default ExpensesSubCategoriesClass;