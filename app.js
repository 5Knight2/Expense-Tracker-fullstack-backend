const express=require('express');
const fs=require('fs')
const path=require('path')
const bodyparser=require('body-parser');
const cors=require('cors');
const helmet=require('helmet')
const compression=require('compression')
const mongoose=require('mongoose');
// const morgan=require('morgan')
const dotenv=require('dotenv').config();

 const user_route=require('./router/user');
 const expense_route=require('./router/expense');
// const order_route=require('./router/order');
// const premium_route=require('./router/premium');
// const password_route=require('./router/password');





// const logger=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
const app=express();

app.use(compression());
// app.use(morgan('combined',{stream:logger}));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cors())


 app.use(user_route);
 app.use(expense_route)
// app.use(order_route);
// app.use(premium_route);
// app.use(password_route);
 app.use((req,res)=>{
    res.sendFile(path.join(__dirname,'public/',req.url))
})

mongoose.connect('mongodb+srv://root:Password123@cluster0.dn8re5y.mongodb.net/expense?retryWrites=true&w=majority').then(res=>{
    app.listen(3000);
    console.log('connected');
})
.catch(err=>{console.log(err)})

