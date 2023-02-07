const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const Router = require("./routes/routes");
//const {db} = require('./models/User');
// const {db} = require('./models/GroupMessage');
// const {db} = require('./models/PrivateMessage');
const dotenv = require('dotenv');
const { request } = require('./routes/routes');
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true}));
const PORT = 8008;


//DB Connection
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fullstackcluster.by4l3g9.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    //Used this line to initialize User, Group Message, and PrivateMassege Collections to DB
    //db.collection;
    console.log('MongoDB Connected!');
}).catch(err => {
    console.log('Error Mongodb connection')
});

//Socket Server
const server = app.listen(PORT, () => {
    console.log("Socket Server running at port: " + PORT);
});

//Router
app.use(Router);


//Socket Conenction (may be removed)
const io = socket(server);

//not sure how to properly implement sockets with mongodb so I will do what I can
// users = [];
// io.on("connection", (clientSocket) => {
//     console.log("Client Connection Request");
//     console.log("Client ID: " + clientSocket.id);

//     clientSocket.on('setUsername', function(data) {
//         console.log(data);
        
//         if(users.indexOf(data) > -1) {
//            socket.emit('userExists', data + ' username is taken! Try some other username.');
//         } else {
//            users.push(data);
//            socket.emit('userSet', {username: data});
//         }
//      });

//     clientSocket.on('msg', function(data) {
//         io.sockets.emit('newmsg', data);
//     });


//     //emit message TO client
//     clientSocket.emit("welcome", "Welcome to Gil's Chat App")

//     //disconnect client
//     socket.on("disconnect", (data) =>{
//         console.log(`Client disconnected: ${data}`);
//     })
// })


