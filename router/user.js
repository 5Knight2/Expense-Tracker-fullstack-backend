const express=require('express');
const signupController=require('../controller/user')


const router=express.Router();

router.post('/user/signup',signupController.signup);

router.post('/user/login',signupController.login);

module.exports=router;