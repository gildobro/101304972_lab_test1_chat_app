const express = require('express');
const app = express();


//maybe change later if pritesh allows
const rooms = ["news", "covid19", "nodeJS"];

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
    }catch(err){
        res.status(500).send(err);
    }
});




module.exports = app;
