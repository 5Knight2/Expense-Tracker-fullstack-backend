const sequelize=require('../util/database');
const Sequelize=require('sequelize');

const reset=sequelize.define('forgotPasswordRequests',{
    id:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    isActive:{
        type:Sequelize.STRING,
        allowNull:false,
        defaultValue:true
    }

})
module.exports=reset;