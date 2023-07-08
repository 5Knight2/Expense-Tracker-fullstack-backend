const User=require('../model/user')
const Expense=require('../model/expense')
const File_Url=require('../model/file_url')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const sequelize=require('../util/database')
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
        let expense=await req.user.getExpenses()
        expense=JSON.stringify(expense);
 
        const FILE_NAME='expense_for_'+req.user.email+new Date()+'.txt';

        const URL= await update(expense,FILE_NAME);

        await req.user.createFileurl({url:URL});
        
        res.status(200).json({file_Url:URL})


    }
    catch(err){console.log(err)
    res.status(500).json({err:err})}

}

exports.get_All_Expenses=(req,res,next)=>{
  
    if(req.query.page){
    const limit=Number(req.query.rows);
   const offset=(Number (req.query.page)-1)*limit
  
     Expense.findAndCountAll({  
        where: {
          userId:req.user.id
        },
        offset: offset,
        limit: limit
      })

    .then(result=>{return res.send(result)})
    .catch(err=>{console.log(err)})}
    else{
req.user.getExpenses()
        .then(result=>{return res.send(result)})
        .catch(err=>{console.log(err)})}
    
   
}

exports.post_Expense = async (req, res, next) => {
    
    try {
        const t=await sequelize.transaction();

        const result = await req.user.createExpense({
        description: req.body.description,
        type: req.body.type,
        amount: req.body.amount
      },{transaction:t});
  
      req.user.totalCost = Number(req.user.totalCost) + Number(result.amount);
      await req.user.save({transaction:t});
      await t.commit();
      return res.json(result.id);
    } catch (err) {
      await t.rollback();
      return res.end();
      console.log(err);
    }
  };

exports.delete=async (req,res,next)=>{
    const id=req.params.id
    const t=await sequelize.transaction();
    try{
   
    const object=await req.user.getExpenses({where:{id:id},transaction:t})
    
        req.user.totalCost=Number(req.user.totalCost)-Number(object[0].amount);
        await req.user.save()
            if(object[0]){
                await object[0].destroy()
                await t.commit();
                return res.end()}
            }
        
    catch(err){await t.rollback()
            console.log(err)}

        
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

