const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const attemptsRoute = require('./routes/attemptsRoute');
mongoose.connect('mongodb://localhost:27017/wpr-quiz');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', ()=>{
    console.log('database connected');
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', attemptsRoute);
app.listen(3000, ()=>{
    console.log('listening on port 3000')
})