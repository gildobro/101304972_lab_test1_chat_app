const mongoose = require('mongoose');
const formattedDate = require('../methods/dateFormat');



const GroupMessageSchema = new mongoose.Schema({
    from_user: {
      type: String,
      required: true,
    },
    room: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
        maxlength: 120,
        validate(value){
            if(value > 120){
                throw new Error("Message cannot be greater than 120 characters")
            }
        }
    },
    date_sent: {

    }
})