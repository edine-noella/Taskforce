import express from 'express';
import ExpensesCategoriesClass from '../controllers/expensesCategoriesController';

const router = express.Router();

router.post('/', ExpensesCategoriesClass.createExpenseCategory);
router.get('/', ExpensesCategoriesClass.getAllExpenseCategories);

export default router;