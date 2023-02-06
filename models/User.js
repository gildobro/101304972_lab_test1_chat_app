const mongoose = require('mongoose');
const formattedDate = require('../methods/dateFormat');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Provide User Name"],
        validate(value){
            if(!value.unique){
                throw new Error("Username already exists");
            }
        }
    },
    firstname: {
        type: String, 
        required: [true, "Provide First Name"]
    },
    lastname: {
        type: String,
        require: [true, "Provide Last Name"]
    },
    password: {
        type: String,
        require: [true, "Password must have atleast 6 characters"],
        minlength: 6,
    },
    created: {
        type: Date,
        default: formattedDate,
    },
});


//Middleware
UserSchema.pre('save', (next) => {
    console.log("Pre Save");
    let now = formattedDate;

    this.updatedat = now;
    if(!this.created) {
        this.created = now
    };

    next();
});


UserSchema.post('init', (doc) => {
    console.log('%s has been initialized from the db', doc._id);
  });
  
  UserSchema.post('validate', (doc) => {
    console.log('%s has been validated (but not saved yet)', doc._id);
  });
  
  UserSchema.post('save', (doc) => {
    console.log('%s has been saved', doc._id);
  });
  
  UserSchema.post('remove', (doc) => {
    console.log('%s has been removed', doc._id);
  });



const User = mongoose.model("User", UserSchema);
module.exports = User;