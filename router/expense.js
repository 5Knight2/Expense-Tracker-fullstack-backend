const express=require('express')
const expenseController=require('../controller/expense')

const authenticationMiddleware=require('../middleware/auth')
const router=express.Router();

router.get('/expense',authenticationMiddleware.authenticate,expenseController.getAllExpenses);

router.post('/expense',authenticationMiddleware.authenticate,expenseController.postExpense);

router.delete('/expense/:id',authenticationMiddleware.authenticate,expenseController.delete);

router.get('/expense/download',authenticationMiddleware.authenticate,expenseController.download);

router.get('/expense/downloadHistory',authenticationMiddleware.authenticate,expenseController.downloadHistory);

module.exports=router;