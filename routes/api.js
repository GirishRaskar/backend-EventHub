const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Event = require('../models/events')
const Special = require('../models/specialevents')
const jwt = require('jsonwebtoken')
const db = "mongodb+srv://Girish:<db_password>@cluster0.3nug5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const con = mongoose.connect(db, function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});


function verifyToken(req, res, next) 
{
  if(!req.headers.authorization) 
  {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') 
  {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) 
  {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

router.get('/events', async (req, res) => {
  
  try {
     
    const events = await Event.find(); // Fetch all events
    res.status(200).json(events);
    console.log("Got it") // Respond with JSON
  } catch (err) {
      res.status(500).send('Error retrieving events: ' + err.message);
  }
});


router.get('/special', verifyToken, async (req, res) => {
  try {
      const specials = await Special.find(); // Fetch all specials
      res.status(200).json(specials); // Respond with JSON
  } catch (err) {
      res.status(500).send('Error retrieving specials: ' + err.message);
  }
});

router.post('/login', (req, res) => {
    let userData = req.body
    
    if ((userData.email == "Marvellous123") && (userData.password == "Marvellous123")) 
    {
      let payload = {subject: 1}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})   
    } 
    else 
    {
        res.status(401).send('Invalid Password')
    } 
})

module.exports = router;