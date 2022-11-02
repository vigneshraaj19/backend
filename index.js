const express = require('express');
const app=express();
require("dotenv").config();
const mongoose=require("mongoose");
const userRouter = require('./userRouter');
const morgan =require('morgan');
const cors=require('cors');
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/api',userRouter);


const port=process.env.PORT || 5000;
app.listen(port,() =>{
    console.log("localhost connected sucessfully");
})

  mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB Connetion Successfulls");
  })
  .catch((err) => {
    console.log(err.message);
  });