const express=require('express')
const premium_controller=require('../controller/premium')

const authentication_middleware=require('../middleware/auth')


const router=express.Router();

router.get('/premium/showLeaderboard',authentication_middleware.authenticate,premium_controller.get_All_Expenses);


module.exports=router;