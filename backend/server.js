const express = require('express');
const {connection} = require('./config/db')

const app = express();

app.get("/",(req,res) => {
    res.send("Home Page")
})

app.listen(6996, async () => {
    try {
        await connection;
        console.log('connected to database');
    } catch (err) {
        console.log('could not connect to database');
        console.log(err)
    }
    console.log("server is listening on http://localhost:6996")
})