const User=require('../model/user')
const File_Url=require('../model/file_url')
const sequelize=require('../util/database')

exports.download_history=async (req)=>{
   const a= await req.user.getFileurls();
   return a;
}