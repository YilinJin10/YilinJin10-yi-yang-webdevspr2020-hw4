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
let promise;



// This is the default address for MongoDB.
// Make sure MongoDB is running!
const mongoEndpoint = 'mongodb://127.0.0.1/shorter_url';
const remoteMongo = process.env.MONGODB_URI;
const mongo = "mongodb://heroku_m0trd6gq:@ds351628.mlab.com:51628/heroku_m0trd6gq"
const uri = process.env.MONGODB_URI || mongoEndpoint;
const options = {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // family: 4 // Use IPv4, skip trying IPv6
};
// useNewUrlParser is not required, but the old parser is deprecated
// promise = mongoose.connect(mongoEndpoint, { useNewUrlParser: true });
mongoose.connect(uri, options);
//
// promise.then(function() {
//     console.log('connected!');
//     urlModel.deleteAll();
//     console.log('all url deleted!');
//     counterModel.deleteAll();
//     console.log('counter deleted!');
//     brandedModel.deleteAll();
//     console.log('all branded deleted!')
//     // counterModel.getCount()
//     //     .then((response) => {
//     //         if (response) {
//     //             res.send("current" + response.count);
//     //         } else {
//     //             res.send("count not found");
//     //         }
//     //     });
//
//     // counterModel.insert({_id: 'url_count', count: 0});
//     // console.log('counter inserted!');
//     // urlModel.deleteAll({}, function() {
//     //     console.log('URL collection removed');
//     // });
//     // counterModel.deleteAll({}, function() {
//     //     console.log('Counter collection removed');
//     //     let counter = new counterModel({_id: 'url_count', count: 10000});
//     //     counter.save(function(err) {
//     //         if(err) return console.error(err);
//     //         console.log('counter inserted');
//     //     });
//     // });
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