const User=require('../model/user')
const Expense=require('../model/expense')
const File_Url=require('../model/file_url')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Download=require('../services/download')
const aws=require('aws-sdk')
const { UpdateAttribute } = require('sib-api-v3-sdk')

exports.download_history=async(req,res,next)=>{
    try { const history=await Download.download_history(req)
res.status(200).json(history);
    }catch(err){console.log(err)
    res.status(400).end()}
}

exports.download=async(req,res,next)=>{
    try{
        let expense=await Expense.find({   
            userId:req.user.id
        })
        expense=JSON.stringify(expense);
 
        // const FILE_NAME='expense_for_'+req.user.email+new Date()+'.txt';

        // const URL= await update(expense,FILE_NAME);

        const URL='https://www.google.com';

        const file=new File_Url({userId:req.user,url:URL});
        file.save();
        
        res.status(200).json({file_Url:URL})


    }
    catch(err){console.log(err)
    res.status(500).json({err:'something went wrong'})}

}

exports.get_All_Expenses=(req,res,next)=>{
  
    if(req.query.page!=null || req.query.page!=undefined){
    const limit=Number(req.query.rows);
   const offset=(Number (req.query.page)-1)*limit
  
     Expense.find({   
          userId:req.user.id
      }).limit(limit).skip(offset)

    .then(result=>{return res.send(result)})
    .catch(err=>{console.log(err)})}
    else{
Expense.find({userId:req.user.id})
        .then(result=>{return res.send(result)})
        .catch(err=>{console.log(err)})}
    
   
}

exports.post_Expense = async (req, res, next) => {
    
    try {

        const expense = new Expense({
        description: req.body.description,
        type: req.body.type,
        amount: req.body.amount,
        userId:req.user._id
        })
        await expense.save();
  
      req.user.totalCost = Number(req.user.totalCost) + Number(expense.amount);
      await req.user.save();
      return res.json(expense._id);
    } catch (err) {
      return res.status(403).send('Something went wrong');
    }
  };

exports.delete=async (req,res,next)=>{
    const id=req.params.id
 
    try{
   
    const object=await Expense.findOne({_id:id})
    
        
            if(object.userId.toString()===req.user._id.toString()){
                req.user.totalCost=Number(req.user.totalCost)-Number(object.amount);
                await req.user.save()
                await object.deleteOne()
                
                return res.end()}
            }
        
    catch(err){
            console.log(err)
            return res.status(403).send('user not authorize');}

        
    }
    

async function update(data,FILE_NAME){
    const KEY=process.env.AWS_KEY;
    const SECRET=process.env.AWS_SECRET;
    const BUCKET_NAME=process.env.AWS_BUCKET_NAME;

    let S3Bucket=new aws.S3({
        accessKeyId:KEY,
        secretAccessKey:SECRET,
        Bucket:BUCKET_NAME
    })

    var params={
        Bucket:BUCKET_NAME,
        Key:FILE_NAME,
        Body:data,
        ACL:'public-read'
    }

    return new Promise((resolve, reject)=>{
     S3Bucket.upload(params,(err,response)=>{
        
        if(err){
         reject(err)}
        else{
             resolve(response.Location);
        }})
    })
    

} 

