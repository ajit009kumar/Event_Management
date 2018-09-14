const express = require('express');
const Events = require('../models/events');

const router = new express.Router();

router.post('/create_event',async(req, res) =>{
  
  const eventObj = await Events.create({
    user:req.user._id,
    eventName:req.body.eventName,
    description:req.body.eventDescription,
    duration:req.body.duration,
    location:req.body.location,
    fees:req.body.fees,
    tags:req.body.tags,
    participantNo:req.body.participantNo 
  })

  res.status(200).json({
    success:true,
    data:eventObj
  });

});



router.get('/fetchEvents',async(req,res) => {

  const availableEvents = await Events.find({user:req.user._id});
  return res.status(200).json({
    success:true,
    data:availableEvents
  })

})


module.exports = router;
