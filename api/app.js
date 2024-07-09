const express=require('express');
const app=express(); // creating an instance
const cors = require('cors');
app.use(express.json()); //req response format
app.use(cors());
//route imports
//const basic=require("./router/basicRouter");
const usersRouter = require('./router/User');
app.use('/auth', usersRouter); 
module.exports=app;