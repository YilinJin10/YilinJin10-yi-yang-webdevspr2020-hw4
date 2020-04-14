// We are using the Schema Class here
// This allows us to declare specifically what is IN the
// document and what is not
const Schema = require('mongoose').Schema;


exports.branded = new Schema({
    _id: String,
    url: String
// this explicitly declares what collection we're using
}, { collection : 'branded' });

// ShorterURLSchema.pre('save', function(next) {
//     console.log('running pre-save');
//     var doc = this;
//     Counter.findByIdAndUpdate({ _id: 'url_count' }, { $inc: { count: 1 } }, function(err, counter) {
//         if(err) return next(err);
//         console.log(counter);
//         console.log(counter.count);
//         doc._id = counter.count;
//         console.log(doc);
//         next();
//     });
// });
//
// module.exports = ShorterURLSchema;