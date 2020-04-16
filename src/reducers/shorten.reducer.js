import {combineReducers} from "redux";
import constants from "../constants"

function shortened(state = [], action) {
    switch (action.type) {
        case 'HASH_RECEIVED':
            console.log("in reducer")
            console.dir(action)
            return constants.unbrandedPrefix.concat(action.hash.data)
    }
    return state;
}


function getURL(state = [], action) {
    switch (action.type) {
        case 'RECEIVED_URL':
            console.log("in reducer")
            console.dir(action)
            return action.url.data;
    }
    return state;
}

export default combineReducers({
    shortened,
    getURL
});

