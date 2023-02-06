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
        type: Date,
        default: formattedDate,
    },
});

GroupMessageSchema.pre('save', (next) => {
    console.log("Pre Save");
    let now = formattedDate;

    this.updatedat = now;
    if(!this.created) {
        this.created = now
    };

    next();
});


GroupMessageSchema.post('init', (doc) => {
    console.log('%s has been initialized from the db', doc._id);
});

GroupMessageSchema.post('validate', (doc) => {
  console.log('%s has been validated (but not saved yet)', doc._id);
});

GroupMessageSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});

GroupMessageSchema.post('remove', (doc) => {
  console.log('%s has been removed', doc._id);
});

const GroupMessage = mongoose.model("GroupMessage", GroupMessageSchema);
module.exports = GroupMessage;