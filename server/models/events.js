const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    eventName: {type: String},
    description:{type:String},
    duration:{type:Number},
    location:{type:String},
    fees:{type:Number},
    tags:{type:String},
    maximumNoOfParticipant:{type:Number},
});

module.exports = mongoose.model('Events', eventsSchema);


