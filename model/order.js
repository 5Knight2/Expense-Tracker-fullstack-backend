const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const orderSchema=new Schema({


userId:{type:mongoose.Types.ObjectId,
    ref:'User',
    required:true,
    },

orderId:{type:String,
        required:true},
        
paymentId:{type:String
        },
        
paymentStatus:{type:String,
        required:true},
})

module.exports=mongoose.model('Order',orderSchema);

// const sequelize=require('../util/database')
// const Sequelize=require('sequelize')

// const order=sequelize.define('order',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         autoIncrement:true,
//         primaryKey:true

//     },
//     orderId:{
//         type:Sequelize.STRING
//     },
//     paymentId:{
//         type:Sequelize.STRING
//     },
//     paymentstatus:{
//         type:Sequelize.STRING
//     }
// })

// module.exports=order;