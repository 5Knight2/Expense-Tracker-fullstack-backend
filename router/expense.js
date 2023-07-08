const express=require('express')
const expense_controller=require('../controller/expense')

const authentication_middleware=require('../middleware/auth')
const router=express.Router();

router.get('/expense',authentication_middleware.authenticate,expense_controller.get_All_Expenses);

router.post('/expense',authentication_middleware.authenticate,expense_controller.post_Expense);

router.get('/delete/:id',authentication_middleware.authenticate,expense_controller.delete);

router.get('/download',authentication_middleware.authenticate,expense_controller.download);

router.get('/download_history',authentication_middleware.authenticate,expense_controller.download_history);

module.exports=router;