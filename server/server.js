require('dotenv').config();
const express = require('express');
// const user = require('./controller/user.controller');
const shorten = require('./controller/shorter_url.controller');
const branded = require('./controller/branded.controller');
// const item = require('./controller/items.controller');

const urlModel = require('./model/shorter_url.model');
const counterModel = require('./model/counter.model');
const brandedModel = require('./model/branded.model');


const app = express();

const mongoose = require('mongoose');

// base64 encoding
const btoa = require('btoa');
// base64 decoding
const atob = require('atob');
// body parser
const bodyParser = require('body-parser');

const http = require('http');




// This is the default address for MongoDB.
// Make sure MongoDB is running!
const mongoEndpoint = 'mongodb://127.0.0.1/shorter_url';
const uri = process.env.MONGODB_URI;

// useNewUrlParser is not required, but the old parser is deprecated
// promise = mongoose.connect(mongoEndpoint, { useNewUrlParser: true });
mongoose.connect(uri || mongoEndpoint, {useNewUrlParser: true});

// promise.then(function() {
//     console.log('connected!');
//     urlModel.deleteAll();
//     console.log('all url deleted!');
//     counterModel.deleteAll();
//     console.log('counter deleted!');
//     brandedModel.deleteAll();
//     console.log('all branded deleted!')
// });

// Get the connection string
const db = mongoose.connection;

// This will create the connection, and throw an error if it doesn't work
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Note that it is common practice got backend APIs in Node to start with the api prefix
// to distinguish them from frontend routes
app.use('/api/shorten', shorten);
app.use('/api/branded', branded);


app.listen(3001, function() {
    console.log('Starting server');
});

// app.get('/', function(req, res) {
//     res.sendFile('views/index.html', {
//         root: __dirname
//     });
// });