import {combineReducers} from "redux";

function branded(state = [], action) {
    switch (action.type) {
        case 'BRAND_RECEIVED':
            console.log("in reducer")
            console.dir(action)
            if (action.brand.data.hasOwnProperty("_id")) {
                return action.brand.data._id;
            } else {
                return action.brand.data;
            }
            return action.brand.data;
    }
    return state;
}

export default combineReducers({
    branded
});

