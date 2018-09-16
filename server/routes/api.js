const express = require('express')
const Events = require('../models/events')

const router = new express.Router()

router.post('/create_event', async (req, res) => {
  const eventObj = await Events.create({
    user: req.user._id,
    eventName: req.body.eventName,
    description: req.body.eventDescription,
    duration: req.body.duration,
    location: req.body.location,
    fees: req.body.fees,
    tags: req.body.tags,
    participantNo: req.body.participantNo
  })

  res.status(200).json({
    success: true,
    data: eventObj
  })
})

router.get('/fetchEvents', async (req, res) => {
  const availableEvents = await Events.find({user: req.user._id})
  return res.status(200).json({
    success: true,
    data: availableEvents
  })
})

router.put('/deleteEvent', async (req, res) => {
  const event = await Events.remove({_id: req.body.eventId})
  const availableEvents = await Events.find({user: req.user._id})
  return res.status(200).json({
    success: true,
    data: availableEvents
  })
})

router.put('/updateEvent', async (req, res) => {


  const event = await Events.findOne({_id: req.body.eventDetails.eventId})
  event.eventName = req.body.eventDetails.eventName || event.eventName
  event.description = req.body.eventDetails.eventDescription || event.description
  event.duration = req.body.eventDetails.duration || event.duration
  event.location = req.body.eventDetails.location || event.location
  event.fees = req.body.eventDetails.fees || event.fees
  event.tags = req.body.eventDetails.tags || event.tags
  event.participantNo =
    req.body.eventDetails.participantNo || event.participantNo

  const updateEvent = await event.save()

  const availableEvents = await Events.find({user: req.user._id})

  // console.log('updateEvent=================>',updateEvent);

  return res.status(200).json({
    success: true,
    data: availableEvents
  })
})

module.exports = router
