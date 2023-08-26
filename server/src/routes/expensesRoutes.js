import express from 'express';
import ExpensesClass from '../controllers/expensesContoller';

const router = express.Router();

router.post('/', ExpensesClass.createExpenses);
router.get('/', ExpensesClass.getAllExpenses);

export default router;