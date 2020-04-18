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
            console.dir(action);
            return action.url.data;
    }
    return state;
}

function redirect(state = '', action) {
    switch (action.type) {
        case 'DELETED_IN_BRANDED' :
            console.log("calling redirect in reducer");
            alert("deletion successful, will redirect to home page")
            return '/index';
        case 'ERROR_IN_BRANDED' :
            alert("invalid brand url provided, will redirect to home page")
            return '/index';
    }
    return state;
}

export default combineReducers({
    branded,
    getURL,
    redirect
});

