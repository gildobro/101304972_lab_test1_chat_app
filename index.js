const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
//const SignUpRouter = require('./routes/signup');
const Router = require("./routes/routes");
//const RoomsRouter = require('./routes/rooms');
//const {db} = require('./models/User');
// const {db} = require('./models/GroupMessage');
// const {db} = require('./models/PrivateMessage');
const dotenv = require('dotenv');
const formattedDate = require('./methods/dateFormat');
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
    console.log(formattedDate);
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

io.on("connection", (clientSocket) => {
    console.log("Client Connection Request");
    console.log("Client ID: " + clientSocket.id);

    //emit message TO client
    clientSocket.emit("welcome", "Welcome to Gil's Chat App")
})


