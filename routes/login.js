const express = require('express');
const User = require('../models/User');
const app = express();



//Login Page
//http://localhost:8008/login
app.get("/login", (req, res) => {
    try{
        res.status(200).send(`
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

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);



    try{
        User.findOne({ username })
        .then(user => {
            //if user doesn't exist, send client to register
            if(!user){
                return res.send(`<script>alert("User Not Found!"); window.location.href = "/signup"; </script>`);
            }
            //if user password is wront, send user back to login page to retry
            if(user.password !== password) {
                return res.send(`<script>alert("Incorrect Password!"); window.location.href = "/login";</script>`);
            }
            //if user and password exist in database, send user to home page
            res.send(`<script>alert("Login Successful!"); window.location.href = "/"; </script>`);
        });
    }catch (err){
        res.status(500).send(err);
    }
});

module.exports = app;
