const express=require('express')
const orderController=require('../controller/order')
const authorization=require('../middleware/auth')


const router=express.Router();
router.get('/order/buy',authorization.authenticate,orderController.buy);
router.post('/order/changeStatus',authorization.authenticate,orderController.changeStatus);
module.exports=router;