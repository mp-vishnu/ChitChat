//const express = require('express');
//const pqr = express();
const app = require('./app');
//const http = require('http').createServer(pqr);
//const io = require('./utils/socket.io');

const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
//config
dotenv.config({path: 'config/config.env'});

// Connecting to database
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
