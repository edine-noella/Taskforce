import express from 'express';
import ExpensesSubCategoriesClass from '../controllers/expenseSubCategories';

const router = express.Router();

router.post('/', ExpensesSubCategoriesClass.createExpenseSubCategory);
router.get('/', ExpensesSubCategoriesClass.getAllExpenseSubCategories);

export default router;