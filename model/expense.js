const sequelize=require('../util/database');
const Sequelize=require('sequelize');

const expense=sequelize.define('expenses',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,},
    amount:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    description:{
            type:Sequelize.STRING,
            allowNull:false,
        },
    type:{
            type:Sequelize.STRING,
            allowNull:false,
        }
        

})

module.exports=expense;