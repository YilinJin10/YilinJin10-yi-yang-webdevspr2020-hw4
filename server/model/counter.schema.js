const Schema = require('mongoose').Schema;


exports.CounterSchema = new Schema({
    _id: { type: String, required: true },
    count: { type: Number, default: 0 }
// this explicitly declares what collection we're using
}, { collection : 'shorter_url' });