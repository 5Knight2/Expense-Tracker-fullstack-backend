const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const resetSchema=new Schema({


userId:{type:mongoose.Types.ObjectId,
    ref:'User',
    required:true,
    },

linkId:{type:String,
        required:true},
        
isActive:{type:Boolean,
        required:true},
})


module.exports=mongoose.model('Reset',resetSchema);
// const sequelize=require('../util/database');
// const Sequelize=require('sequelize');

// const reset=sequelize.define('forgotPasswordRequests',{
//     id:{
//         type:Sequelize.STRING,
//         allowNull:false,
//         primaryKey:true
//     },
//     isActive:{
//         type:Sequelize.STRING,
//         allowNull:false,
//         defaultValue:true
//     }

// })
// module.exports=reset;