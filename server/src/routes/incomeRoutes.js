import express from 'express';
import IncomeClass from '../controllers/incomeController';

const router = express.Router();

router.post('/', IncomeClass.createIncome);
router.get('/', IncomeClass.getAllIncome);

export default router;