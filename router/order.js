const express=require('express')
const order_controller=require('../controller/order')
const authorization=require('../middleware/auth')


const router=express.Router();
router.get('/buy',authorization.authenticate,order_controller.buy);
router.post('/changeStatus',authorization.authenticate,order_controller.changeStatus);
module.exports=router;