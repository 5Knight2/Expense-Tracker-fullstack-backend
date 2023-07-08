const sequelize=require('../util/database')
const Sequelize=require('sequelize')

const order=sequelize.define('order',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true

    },
    orderId:{
        type:Sequelize.STRING
    },
    paymentId:{
        type:Sequelize.STRING
    },
    paymentstatus:{
        type:Sequelize.STRING
    }
})

module.exports=order;