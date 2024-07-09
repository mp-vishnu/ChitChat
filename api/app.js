const express = require('express');
const app = express(); // creating an instance
const cors = require('cors');
app.use(express.json()); //req response format
app.use(cors());
//route imports
//const basic=require("./router/basicRouter");
//const authRouter = require('./router/Auth');
const usersRouter = require('./router/User');
const authRouter = require('./router/Auth');
app.use('/auth', authRouter);
app.use('/users', usersRouter);
module.exports = app;
