import pokemonReducers from "./pokemon.reducer";
import userReducer from "./user.reducer";
import {combineReducers} from 'redux'
import shortenReducer from "./shorten.reducer"
import brandedReducer from "./branded.reducer"


export default combineReducers({
    pokemon: pokemonReducers,
    user: userReducer,
    shorten: shortenReducer,
    branded: brandedReducer
})