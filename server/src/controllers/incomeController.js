import dotenv from 'dotenv';
import { Op } from 'sequelize';
import db from '../../models/index'

dotenv.config();

const { Income } = db;

class IncomeClass{
  
    //function to create income
    static async createIncome(req, res) {
        const { amount , incomeName} = req.body;


        try {

            //check if income name already exists
            const incomeExists = await Income.findOne({
                where: {                 
                    [Op.and]: [{ incomeName }]
                }
            });

            //if category name exists
            if (incomeExists) {
                return res.status(409).json({
                    status: 409,
                    message: 'Income name already exists'
                });
            }

            const newIncome = await Income.create({
                amount,
                incomeName
                
            });
            return res.status(201).json({
                status: 201,
                message: 'Income created successfully',
                data: newIncome
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Internal server error',
                error: error.message
            });
        }
    }

    //function to get all income
    static async getAllIncome(req, res) {
        try {
            const allIncome = await Income.findAll();
            return res.status(200).json({
                status: 200,
                message: 'All income',
                data: allIncome
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

export default IncomeClass;