const mongoose = require("mongoose");
// Recall how exports work in Node.js?
const brandedSchema = require('./branded.schema').branded;

// Here we are mapping our PokemonSchema to the model Pokemon.
// If we are interested in referencing the Pokemon model elsewhere,
// we can simply do mongoose.model("Pokemon") elsewhere
const brandedModel = mongoose.model("branded", brandedSchema);

function insertURL(shorterURL) {
    return brandedModel.create(shorterURL);
}

// function findURLByData(data) {
//     return brandedModel.findOne({url: data}).exec();
// }

function getAllURL() {
    return brandedModel.find().exec();
}
// function getAllPokemon() {
//     return PokemonModel.find().exec();
// }

// function findPokemonById(id) {
//     return ShorterURLModel.find({_id: id}).exec();
// }

// Mongo provides a findById to query for the _id field (and you don't have
// to use the ObjectId class here!
function findURLById(id) {
    return brandedModel.findById(id).exec();
}

function updateURL(id, shorterURL) {
    return brandedModel.update({_id: id}, {$set: shorterURL})
}

function deleteURL(id) {
    return brandedModel.deleteOne({_id: id});
}
// Make sure to export a function after you create it!
module.exports = {
    findURLById,
    insertURL,
    getAllURL,
    updateURL,
    deleteURL
};