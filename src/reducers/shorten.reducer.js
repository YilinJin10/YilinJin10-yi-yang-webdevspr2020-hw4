import {combineReducers} from "redux";

function shortened(state = [], action) {
    switch (action.type) {
        case 'HASH_RECEIVED':
            console.log("in reducer")
            console.dir(action)
            return action.hash.data
    }
    return state;
}

export default combineReducers({
    shortened
});

