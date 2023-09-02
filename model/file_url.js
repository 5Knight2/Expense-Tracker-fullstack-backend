const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const fileUrlSchema=new Schema({


userId:{type:mongoose.Types.ObjectId,
    ref:'User',
    required:true,
    },
        
url:{type:String,
        required:true},
})

module.exports=mongoose.model('fileUrl',fileUrlSchema);

// const sequelize=require('../util/database');
// const Sequelize=require('sequelize');

// const fileurl=sequelize.define('fileurl',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
//     url:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }

// })
// module.exports=fileurl;