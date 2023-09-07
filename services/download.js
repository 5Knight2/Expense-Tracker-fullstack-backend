const User=require('../model/user')
const File_Url=require('../model/file_url')
const sequelize=require('../util/database')

exports.downloadHistory=async (req)=>{
   const a= await File_Url.find({userId:req.user});
   return a;
}