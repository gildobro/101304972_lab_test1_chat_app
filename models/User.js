const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Provide User Name"]
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
        default: Date.now
    },
});


//Middleware
UserSchema.pre('save', (next) => {
    console.log("Pre Save");
    let now = Date.now();

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