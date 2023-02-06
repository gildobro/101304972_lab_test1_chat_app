const mongoose = require('mongoose');
const formattedDate = require('../methods/dateFormat');

const PrivateMessageSchema = new mongoose.Schema({
    from_user:{
        type: String,
        required: true,
    },
    to_user: {
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
        type: Date,
        default: formattedDate,
    },
});

PrivateMessageSchema.pre('save', (next) => {
    console.log("Pre Save");
    let now = formattedDate;

    this.updatedat = now;
    if(!this.created) {
        this.created = now
    };

    next();
});


PrivateMessageSchema.post('init', (doc) => {
    console.log('%s has been initialized from the db', doc._id);
});

PrivateMessageSchema.post('validate', (doc) => {
  console.log('%s has been validated (but not saved yet)', doc._id);
});

PrivateMessageSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});

PrivateMessageSchema.post('remove', (doc) => {
  console.log('%s has been removed', doc._id);
});

const PrivateMessage = mongoose.model("PrivateMessage", PrivateMessageSchema);
module.exports = PrivateMessage;


