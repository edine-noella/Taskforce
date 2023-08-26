import express from 'express';
import ExpensesCategoriesRoutes from './expensesCategoriesRoutes';
import ExpensesSubCategoriesRoutes from './expensesSubCategoryRoutes';
import ExpensesRoutes from './expensesRoutes';
import IncomeRoutes from './incomeRoutes';

const router = express.Router();

router.use('/expensesCategories', ExpensesCategoriesRoutes);
router.use('/expensesSubCategories', ExpensesSubCategoriesRoutes);
router.use('/expenses', ExpensesRoutes);
router.use('/income', IncomeRoutes);

export default router;