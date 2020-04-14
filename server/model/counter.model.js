const mongoose = require("mongoose");
// Recall how exports work in Node.js?
const CounterSchema = require('./counter.schema').CounterSchema;

// Here we are mapping our PokemonSchema to the model Pokemon.
// If we are interested in referencing the Pokemon model elsewhere,
// we can simply do mongoose.model("Pokemon") elsewhere
const CounterModel = mongoose.model("CounterModel", CounterSchema);