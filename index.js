const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
//const Router = require('routerpath');
//const {db} = require(modelpath);
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 8008;

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
