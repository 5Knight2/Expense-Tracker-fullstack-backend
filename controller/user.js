const User=require('../model/user')
//const Expense=require('../model/expense')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.signup=async(req,res,next)=>{
    obj=req.body;   
  
    bcrypt.hash(obj.password,10,async(err,hash)=>{
        
        try{
        const user= new User({name:obj.fullname,email:obj.email,password:hash,totalCost:0,isPremiumUser:false})
        await user.save()
        res.status(201).end()}
        catch(err){console.log(err)
        if(err.code==11000){
         res.status(403).send("Email already registered");
 
        }else res.status(403).send('something went wrong.Try again later');
 }
})}

exports.login=(req,res,next)=>{
    User.findOne(
         {email:req.body.email})
    .then(result=>{
        if(result===null)return res.status(404).send('User not found')
        bcrypt.compare(req.body.password,result.password,(err,same)=>{

            if(same)  return res.send({message:'User login sucessful',token:encrypt(result.id,result.isPremiumUser)})
            else  return res.status(401).send('User not authorized')
        })
    })
    .catch(err=>{console.log(err)
    return res.end();})
}



function encrypt(id,isPremium){
    
    return jwt.sign({userid:id,isPremium:isPremium},'secretKey');
}