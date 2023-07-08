const express=require('express');
const fs=require('fs')
const path=require('path')
const bodyparser=require('body-parser');
const cors=require('cors');
const helmet=require('helmet')
const compression=require('compression')
const morgan=require('morgan')
const dotenv=require('dotenv').config();

const user_route=require('./router/user');
const expense_route=require('./router/expense');
const order_route=require('./router/order');
const premium_route=require('./router/premium');
const password_route=require('./router/password');

const sequelize=require('./util/database');
const Expense=require('./model/expense');
const User=require('./model/user');
const Order=require('./model/order');
const Reset=require('./model/reset');
const File_Url=require('./model/file_url');

console.log(process.env.SQL_PASSWORD)

const logger=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});
const app=express();
app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream:logger}));
app.use(bodyparser.urlencoded());
app.use(bodyparser.json());
app.use(cors())


app.use(user_route);
app.use(expense_route)
app.use(order_route);
app.use(premium_route);
app.use(password_route);


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Reset);
Reset.belongsTo(User);

User.hasMany(File_Url);
File_Url.belongsTo(User);

sequelize
//.sync({force:true})
.sync()
.then((res)=>{
    console.log('connected');
    console.log(process.env.SQL_PROJECT);
    
    app.listen(process.env.PORT||5000)})
.catch((err)=>{console.log(err)})
