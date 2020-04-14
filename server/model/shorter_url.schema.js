// We are using the Schema Class here
// This allows us to declare specifically what is IN the
// document and what is not
const Schema = require('mongoose').Schema;

const counterModel = require('./counter.model').counterModel;

const ShorterURLSchema = new Schema({
    _id: {type: Number},
    url: String
// this explicitly declares what collection we're using
}, { collection : 'shorter_url' });

ShorterURLSchema.pre('save', function(next) {
    console.log('running pre-save');
    var doc = this;
    // console.dir(doc);
    // next();
    // // counterModel.getCount('url_count');
    // // console.log(counterModel.getCount('url_count'));
    // counterModel.updateCounter('url_count');
    //
    // counterModel.getCount()
    //     .then((response) => {
    //         if (response) {
    //             doc._id = response.count;
    //         } else {
    //             res.send("count not found");
    //         }
    //     });
    //
    // next();
    counterModel.findByIdAndUpdate({ _id: 'url_count' }, { $inc: { count: 1 } }, function(err, counter) {
        if(err) return next(err);
        console.log(counter);
        console.log(counter.count);
        doc._id = counter.count;
        console.log(doc);
        next();
    });
});

module.exports = ShorterURLSchema;