const express=require('express')
const premiumController=require('../controller/premium')

const authenticationMiddleware=require('../middleware/auth')


const router=express.Router();

router.get('/premium/showLeaderboard',authenticationMiddleware.authenticate,premiumController.getAllExpenses);


module.exports=router;