const mongoose = require("mongoose");
// Recall how exports work in Node.js?
const ShorterURLSchema = require('./shorter_url.schema');

// Here we are mapping our PokemonSchema to the model Pokemon.
// If we are interested in referencing the Pokemon model elsewhere,
// we can simply do mongoose.model("Pokemon") elsewhere
const ShorterURLModel = mongoose.model("shorter_url", ShorterURLSchema);

function insertURL(shorterURL) {
    return ShorterURLModel.create(shorterURL);
}

function findURLByData(data) {
    return ShorterURLModel.findOne({url: data}).exec();
}

function getAllURL() {
    return ShorterURLModel.find().exec();
}

// Mongo provides a findById to query for the _id field (and you don't have
// to use the ObjectId class here!
function findURLById(id) {
    return ShorterURLModel.findById(id).exec();
}

function updateURL(id, shorterURL) {
    return ShorterURLModel.updateOne({_id: id}, {$set: shorterURL})
}

function deleteURL(id) {
    return ShorterURLModel.deleteOne({_id: id});
}

function deleteAll() {
    //return ShorterURLModel.deleteMany({}, callback);
    return ShorterURLModel.deleteMany({}, function(err) {
            if (err) {
                console.log(err)
            }
        }
    );
}
// Make sure to export a function after you create it!
module.exports = {
    findURLById,
    insertURL,
    findURLByData,
    getAllURL,
    updateURL,
    deleteURL,
    deleteAll
};