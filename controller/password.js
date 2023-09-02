const User=require('../model/user')
const  Sib=require('sib-api-v3-sdk');
const Reset=require('../model/reset');
const {v4 : uuidv4} = require('uuid');
const { UUIDV4 } = require('sequelize');
const bcrypt=require('bcrypt')
const sequelize=require('../util/database');


exports.reset_link=async(req,res,next)=>{
    
    try{
    
        let user=await User.findOne({email:req.body.email})
        if(!user){res.json({message:'User with this email is not available'})
    }else{
    const api=process.env.SENDINBLUE_API;
    const defaultClient=Sib.ApiClient.instance;
    const apiKey=defaultClient.authentications['api-key']
    apiKey.apiKey=process.env.SENDINBLUE_API;

    const tranEmailApi=new Sib.TransactionalEmailsApi();
    const sender={email:'pratiktarale100@gmail.com'}
    const receiver=[{email:req.body.email}]


    //Create record in reset table

   
   let row=new Reset({linkId:uuidv4(),userId:user._id,isActive:true});
   row=await row.save();
    
    const url='http://localhost:3000/password/resetpassword/'+row.linkId;

    await tranEmailApi.sendTransacEmail({sender,to:receiver,subject:'Reset passwords',textContent:url})
  
    res.json({message:'email sent'});
    console.log('done')
    }}
    catch(err){res.status(401).end()
        console.log(err)}
    
}

exports.reset_get=async(req,res,next)=>{
    const row= await Reset.findOne({linkId:req.params.id})
    if(row.isActive==true){
        res.send("<html><form action='/password/resetpassword/"+req.params.id+"' method='POST'><lable name='label_for_password' for='passowrd'> -Password- </lable> <input type='password' name='password' id='password'><input type='submit' name='submit' id='submit'></form></html>")
 }else console.log('reset link expired')
 }

exports.reset=async(req,res,next)=>{
    
   const row= await Reset.findOne({linkId:req.params.id})
   if(row.isActive==true){
   let user=await User.findById(row.userId)
   bcrypt.hash(req.body.password,10,async(err,hash)=>{
   try{
    user.password=hash;
    await user.save();
    res.status(200).json({message:'password changed successfully'})
    row.isActive=false;
    await row.save();}
    catch(err){console.log(err);res.status(403).json({message:'something went wrong'})}
   })
}
}