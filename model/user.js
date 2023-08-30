const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
email:{type:String,
required:true,
unique:true},

password:{type:String,
    required:true,
    },

name:{type:String,
        required:true},

isPremiumUser:{type:Boolean,
        required:true},
        
totalCost:{type:Number,
        required:true},
})

module.exports=mongoose.model('User',userSchema);

// const sequelize=require('../util/database');
// const Sequelize=require('sequelize');

// const user=sequelize.define('user',{
// id:{
//     type:Sequelize.INTEGER,
//     autoIncrement:true,
//     allowNull:false,
//     primaryKey:true
// },
// email:{
//     type:Sequelize.STRING,
//     allowNull:false,
//     unique:true
// },
// password:{
//     type:Sequelize.STRING,
//     allowNull:false,
// },
// name:{
//     type:Sequelize.STRING,
//     allowNull:false,
// },
// isPremiumUser:{
//     type:Sequelize.BOOLEAN,
//     allowNull:false,
//     defaultValue:false
// },
// totalCost:{
//     type:Sequelize.INTEGER,
//     allowNull:false,
//     defaultValue:0
// }

// })
// module.exports=user;
