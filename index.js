const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
//const Router = require('routerpath');
const {dbUser} = require('./models/User');
const {dbGroup} = require('./models/GroupMessage');
const {dbPrive} = require('./models/PrivateMessage');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 8008;


//DB Connection
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fullstackcluster.by4l3g9.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    dbUser.collection
    dbGroup.collection
    dbPrivate.collection
    console.log('MongoDB Connected!');
}).catch(err => {
    console.log('Error Mongodb connection')
});

//Socket Server
const server = app.listen(PORT, () => {
    console.log("Socket Server running at port: " + PORT);
});


app.get("/", (req, res) => {
    res.sendFile( __dirname + "/login.html");
});

const io = socket(server);

io.on("connection", (clientSocket) => {
    console.log("Client Connection Request");
    console.log("Client ID: " + clientSocket.id);

    //emit message TO client
    clientSocket.emit("welcome", "Welcome to Gil's Chat App")
})


//app.use(express.json())
