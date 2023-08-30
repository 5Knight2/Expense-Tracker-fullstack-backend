const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const expenseSchema=new Schema({


type:{type:String,
    required:true,
    },

description:{type:String,
        required:true},
        
amount:{type:Number,
        required:true},
        
userId:{type:mongoose.Types.ObjectId,
        required:true},
})

module.exports=mongoose.model('Expense',expenseSchema);

// const sequelize=require('../util/database');
// const Sequelize=require('sequelize');

// const expense=sequelize.define('expenses',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true,},
//     amount:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//     },
//     description:{
//             type:Sequelize.STRING,
//             allowNull:false,
//         },
//     type:{
//             type:Sequelize.STRING,
//             allowNull:false,
//         }
        

// })

// module.exports=expense;