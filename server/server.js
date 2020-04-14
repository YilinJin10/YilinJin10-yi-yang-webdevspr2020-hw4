const express = require('express');
// const user = require('./controller/user.controller');
const shorten = require('./controller/shorter_url.controller');
// const item = require('./controller/items.controller');

const app = express();

const mongoose = require('mongoose');

// base64 encoding
const btoa = require('btoa');
// base64 decoding
const atob = require('atob');
// body parser
const bodyParser = require('body-parser');

const http = require('http');
let promise;



// This is the default address for MongoDB.
// Make sure MongoDB is running!
const mongoEndpoint = 'mongodb://127.0.0.1/shorter_url';
// useNewUrlParser is not required, but the old parser is deprecated
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

// Get the connection string
const db = mongoose.connection;

// This will create the connection, and throw an error if it doesn't work
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Note that it is common practice got backend APIs in Node to start with the api prefix
// to distinguish them from frontend routes
app.use('/api/shorten', shorten);

app.listen(3001, function() {
    console.log('Starting server');
});

// app.get('/', function(req, res) {
//     res.sendFile('views/index.html', {
//         root: __dirname
//     });
// });