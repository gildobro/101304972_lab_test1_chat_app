const express = require('express');
const User = require('../models/User');
const app = express();



//Display Signup Page
//http://localhost:8008/signup
app.get("/signup", (req, res) => {
    try{
        res.status(200).send(`
            <h1>Welcome to Gil's Chat App!</h1>
            <h2>SignUp:</h2>

            <form action="/signup" method="post">
                <input type="text" name="username" placeholder="Username" required>
                <input type="text" name="firstname" placeholder="Firstname" required>
                <input type="text" name="lastname" placeholder="Lastname" required>
                <input type="password" name="password" minlength="6" placeholder="Password" required>
                <input type="submit" value="Sign Up!">
            </form>
        `);
    } catch (err){
        console.log(err);
        res.status(500).send(err);
    }
});

//Handle Signup Page
app.post("/signup", async (req, res) => {
    const { username, firstname, lastname, password } = req.body;
    console.log(req.body);

    const user = new User({ username, firstname, lastname, password});
    try{
        //save user to db and redirect to home page
        await user
        .save()
        .then(() => res.send(`<script>alert("User Created!"); window.location.href = "/login"; </script>`))
    }catch (err){
        res.status(500).send(err);
    }
});

//Display Login Page
//http://localhost:8008/login
app.get("/login", (req, res) => {
    try{
        res.status(200).send(`
            <h1>Welcome Back to Gil's Chat App!</h1>
            <h2>Login:</h2>
            <form action="/login" method="post">
                <input type="text" name="username" placeholder="Username" required>
                <input type="password" name="password" minlength="6" placeholder="Password" required>
                <input type="submit" value="Log In">
            </form>
        `);
    } catch (err){
        res.status(500).send(err);
    }
});


//Handle Login Page
app.post("/login", async (req, res) => {
    const { username, password } = req.body;



    try{
        const user = await User.findOne({ username })
        .then(user => {
            //if user doesn't exist, send client to register
            if(!user){
                return res.send(`<script>alert("User Not Found!"); window.location.href = "/login"; </script>`);
            }
            //if user password is wront, send user back to login page to retry
            if(user.password !== password) {
                return res.send(`<script>alert("Incorrect Password!"); window.location.href = "/login";</script>`);
            }

            res.send(`<script>alert("Login Successful!"); window.location.href = "/rooms"; </script>`);
        });
    }catch (err){
        res.status(500).send(err);
    }
});



//Room Routes
const rooms = ["news", "happy", "nodeJS"];

//Display Rooms Page
//http://localhost:8008/rooms
app.get("/rooms", (req, res) => {
    res.send(`
        <h2>Choose a room to join:</h2>
        <form action="/rooms" method="post">
            <label>Room:</label>
            <select name="room">
                ${rooms.map(room => `
                    <option value="${room}">${room}</option>
                `).join("")}
            </select>
            <input type="submit" value="Join Room">
        </form>
    `);
});


//Handle Rooms Page
app.post("/rooms", (req, res) => {
    const { room } = req.body;


    try{
        if (!rooms.includes(room)){
            return res.send("Room not found");
        }


        if (room == rooms[0]){
            res.send(`<script>alert("You have joined the ${room} room"); window.location.href = "/rooms/news"</script>`);
        }
        if (room == rooms[1]){
            res.send(`<script>alert("You have joined the ${room} room"); window.location.href = "/rooms/happy"</script>`);
        }
        if (room == rooms[2]){
            res.send(`<script>alert("You have joined the ${room} room"); window.location.href = "/rooms/nodejs"</script>`);
        }
    }catch(err){
        res.status(500).send(err);
    }
});


//Rooms
//news room
app.get("/rooms/news", (req, res) => {
    res.sendFile( "/Users/Gil1/Desktop/GeorgeBrown Semester 6/Fullstack Development/101304972_lab_test1_chat_app/news.html");
});

//covid19 room
app.get("/rooms/happy", (req, res) => {
    res.sendFile( "/Users/Gil1/Desktop/GeorgeBrown Semester 6/Fullstack Development/101304972_lab_test1_chat_app/happy.html");
});

//nodejs room
app.get("/rooms/nodejs", (req, res) => {
    res.sendFile( "/Users/Gil1/Desktop/GeorgeBrown Semester 6/Fullstack Development/101304972_lab_test1_chat_app/nodejs.html");
});

module.exports = app;
