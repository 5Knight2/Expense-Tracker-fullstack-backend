const express=require('express');
const password_Controller=require('../controller/password')


const router=express.Router();

router.post('/password/forgotpassword',password_Controller.reset_link);

router.post('/password/resetpassword/:id',password_Controller.reset);
router.get('/password/resetpassword/:id',password_Controller.reset_get);
module.exports=router;