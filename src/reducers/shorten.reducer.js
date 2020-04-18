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
            console.log("entered received_url!!!");
            return action.url.data;
    }
    return state;
}

function redirect(state = '', action) {
    console.log(action.type);
    switch (action.type) {
        case 'DELETED' :
            console.log("calling redirect in reducer");
            alert("deletion successful, will redirect to home page")
            return '/index';
        case 'ERROR' :
            alert("invalid url provided, will redirect to home page")
            return '/index';
    }
    return state;
}

export default combineReducers({
    shortened,
    getURL,
    redirect
});

