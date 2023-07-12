const express = require('express');
const { connection } = require('./config/db');
const User = require('./model/user.model');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home Page")
})

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        res.status(400).send({ "error": 'Username already taken' });
    } else {

        bcrypt.hash(password, 4, async (err, hash) => {
            if (err) {
                res.status(500).send({ "err": 'something went wronge, please try again' });
            }

            const newuser = new User({ username, password: hash });
            try {
                await newuser.save();
                res.send({ "msg": "Sign up successful" });
            } catch (error) {
                console.log('Error during signup: ', error)
                res.status(500).send({ "error": 'Internal server error' })
            }
        })
    }
});

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