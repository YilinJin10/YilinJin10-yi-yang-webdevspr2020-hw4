import {combineReducers} from 'redux'
import shortenReducer from "./shorten.reducer"
import brandedReducer from "./branded.reducer"


export default combineReducers({
    shorten: shortenReducer,
    branded: brandedReducer
})