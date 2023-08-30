const Razorpay=require('razorpay')
const Order=require('../model/order');
const User=require('../model/user');
const jwt=require('jsonwebtoken')
const sequelize=require('../util/database')

exports.buy=async (req,res,next)=>{
    const t=await sequelize.transaction();
try{
    const rzp=new Razorpay({
        key_id:process.env.RAZORPAY_KEY,
        key_secret:process.env.RAZORPAY_SECRET
    })
    const amount=2000000;
    rzp.orders.create({amount,currency:'INR'},async (err,order)=>{
        if(err){console.log(err)
        throw new Error(JSON.stringify.err)}
        
        await req.user.createOrer({
            orderId:order.id,
            paymentstatus:'PENDING'
        },{transaction:t})
        await t.commit();
        res.status(201).json({id:order.id,key_id:rzp.key_id})
        
    })

}
catch(err){
    await t.rollback();
    res.status(403).json({message:'something went wrong',error:err})}

}

exports.changeStatus=async (req,res,next)=>{
    
    try{
    const curr_order=await Order.findOne({where:{orderId:req.body.order_id}})
    
        if(req.body.payment_id){
           await curr_order.update({paymentstatus:"SUCCESS",paymentId:req.body.payment_id});
            req.user.update({isPremiumUser:true});
            res.status(201).json({message:"You are now premium user",token:encrypt(req.user.id,req.user.isPremiumUser)});

        }
        else{curr_order.update({paymentstatus:"Failed"});
        res.status(201).json({message:"Payment Failed"});
    }
    }
    catch(err){res.status(403).json({message:'something went wrong',error:err})}
}

function encrypt(id,isPremium){
    
    return jwt.sign({userid:id,isPremium:isPremium},'secretKey');
}