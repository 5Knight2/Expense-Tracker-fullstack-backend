const jwt=require('jsonwebtoken');
const User=require('../model/user');

exports.authenticate=(req,res,next)=>{
    try{
        
        const userobj=jwt.verify(req.headers.authorization,'secretKey');
        
        User.findByPk(userobj.userid)
        .then((user)=>{
            req.user=user
            next();
        })
    }
    catch(err){console.log(err) 
        return res.status(401).json({message:'user is not authorized'})}
}
