const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const messageModel = require('./models/message');

const app = express();
//use express.json() to get data into json format
app.use(express.json());
//Port
const PORT = process.env.PORT || 5000;

//use cors
app.use(cors());


//Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT)
.then(() => console.log("Database connected"))
.catch(err => console.log(err)) 

app.post('/new', async (req, res)=>{
  try{
    const newMessage = new messageModel({
      user: req.body.user,
      message: req.body.message
    })
    //save this item in database
    const saveMessage = await newMessage.save()
    res.status(201).json(saveMessage);
  }catch(err){
    res.json(err);
  }
})

app.get('/', async (req, res)=>{
  try{
    const allMessages = await messageModel.find({});
    res.status(200).json(allMessages);
  }catch(err){
    res.json(err);
  }
})

//Add Port and connect the server
app.listen(PORT, ()=> console.log("Server Connected"))

