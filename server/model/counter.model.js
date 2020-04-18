const mongoose = require("mongoose");
// // Recall how exports work in Node.js?
const CounterSchema = require('./counter.schema').CounterSchema;
//
// // Here we are mapping our PokemonSchema to the model Pokemon.
// // If we are interested in referencing the Pokemon model elsewhere,
// // we can simply do mongoose.model("Pokemon") elsewhere
const counterModel = mongoose.model("counter", CounterSchema);

function updateCounter(id) {
    counterModel.findByIdAndUpdate(
        { _id: id },
        {$inc: {count : 1}}
    );
}

function getCount() {
    return counterModel.findById('url_count').exec();
}

function deleteAll() {
    //return counterModel.remove({});

    return counterModel.deleteMany({}, function(err) {
        console.log('Counter collection removed');
        counterModel.create({_id: 'url_count', count: 0})
        console.log('Counter reset to 0');
        // let counter = new counterModel({_id: 'url_count', count: 10000});
        // counter.save(function(err) {
        //     if(err) return console.error(err);
        //     console.log('counter inserted');
        // });
        if (err) {
            console.log(err)
        }
    });
}


function insert(counter) {
    return counterModel.create(counter);
}

module.exports = {
    updateCounter,
    getCount,
    deleteAll,
    insert,
    counterModel
};