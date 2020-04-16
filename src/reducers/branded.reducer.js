import {combineReducers} from "redux";
import constants from "../constants";

function branded(state = [], action) {
    switch (action.type) {
        case 'BRAND_RECEIVED':
            console.log("in reducer")
            console.dir(action)
            if (action.brand.data.hasOwnProperty("_id")) {
                const brand = action.brand.data._id;
                return constants.brandedPrefix.concat(brand);
            } else {
                return action.brand.data;
            }
    }
    return state;
}

function getURL(state = [], action) {
    switch (action.type) {
        case 'URL_RECEIVED':
            console.log("in reducer")
            console.dir(action)
            return action.url.data;
    }
    return state;
}

export default combineReducers({
    branded,
    getURL
});

