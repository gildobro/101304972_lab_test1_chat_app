const express = require('express');
const User = require('../models/User');
const app = express();



//Display Signup Page
//http://localhost:8008/signup
app.get("/signup", (req, res) => {
    try{
        res.status(200).send(`
            <form action="/signup" method="post">
                <input type="text" name="username" placeholder="Username" required>
                <input type="text" name="firstname" placeholder="Firstname" required>
                <input type="text" name="lastname" placeholder="Lastname" required>
                <input type="password" name="password" minlength="6" placeholder="Password" required>
                <input type="submit" value="Sign Up!">
            </form>
        `);
    } catch (err){
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
        .then(() => res.send(`<script>alert("User Created!"); window.location.href = "/rooms"; </script>`))
    }catch (err){
        res.status(500).send(err);
    }
});

module.exports = app;
