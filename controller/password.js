const User=require('../model/user')
const  Sib=require('sib-api-v3-sdk');
const Reset=require('../model/reset');
const {v4 : uuidv4} = require('uuid');
const { UUIDV4 } = require('sequelize');
const bcrypt=require('bcrypt')
const sequelize=require('../util/database')

exports.reset_link=async(req,res,next)=>{
    const t=await sequelize.transaction();
    try{
    
        user=await User.findOne({where:{email:req.body.email}})
        if(!user){res.json({message:'User with this email is not available'})}
    const api=process.env.SENDINBLUE_API;
    const defaultClient=Sib.ApiClient.instance;
    const apiKey=defaultClient.authentications['api-key']
    apiKey.apiKey=process.env.SENDINBLUE_API;

    const tranEmailApi=new Sib.TransactionalEmailsApi();
    const sender={email:'pratiktarale100@gmail.com'}
    const receiver=[{email:req.body.email}]


    //Create record in reset table

   
    const row=await user.createForgotPasswordRequest({id:uuidv4()},{transaction:t});
    
    const url='http://13.49.240.151/password/resetpassword/'+row.id;

    await tranEmailApi.sendTransacEmail({sender,to:receiver,subject:'Reset passwords',textContent:url})
    await t.commit()
    res.json({message:'email sent'});
    console.log('done')
    }
    catch(err){res.status(401).end()
        await t.rollback();
        console.log(err)}

}

exports.reset_get=async(req,res,next)=>{
    const row= await Reset.findByPk(req.params.id)
    if(row.isActive==true){
        res.send("<html><form action='/password/resetpassword/"+req.params.id+"' method='POST'><lable name='label_for_password' for='passowrd'> -Password- </lable> <input type='password' name='password' id='password'><input type='submit' name='submit' id='submit'></form></html>")
 }else console.log('nooo')
 }

exports.reset=async(req,res,next)=>{
   const row= await Reset.findByPk(req.params.id)
   if(row.isActive==true){
   const user=await User.findByPk(row.userId)
   bcrypt.hash(req.body.password,10,async(err,hash)=>{
   await user.update({password:hash})
    res.status(200).json({message:'password changed successfully'})
    row.isActive=false;
    await row.save();
   })
}
}