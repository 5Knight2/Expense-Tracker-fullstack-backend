const express=require('express');
const passwordController=require('../controller/password')


const router=express.Router();

router.post('/password/forgotpassword',passwordController.reset_link);

router.post('/password/resetpassword/:id',passwordController.reset);
router.get('/password/resetpassword/:id',passwordController.reset_get);
module.exports=router;