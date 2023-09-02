const User=require('../model/user')
const Expense=require('../model/expense')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Sequelize  = require('sequelize')
const sequelize=require('../util/database')

exports.get_All_Expenses=async (req,res,next)=>{
   if(req.user.isPremiumUser==true){ try{
    const result=await User.find().select('name totalCost').sort({totalCost: -1})

    return res.send(result)}
    catch(err){console.log(err)}
   
}else {res.status(401).send('You are not a premium user')}}
