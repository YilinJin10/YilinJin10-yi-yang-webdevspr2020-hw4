import Axios from 'axios'

function sendAttempt() {
    return {
        type: "SEND_ATTEMPT"
    }
}

function sendSuccess(url) {
    return {
        type: "SEND_SUCCESS",
        url
    }
}

function inFlight() {
    return {
        type: "REQUEST_INFLIGHT"
    }
}

function sendFailure(error) {
    return {
        type: "SEND_FAILURE",
        error
    }
}

function receiveBrand(brand) {
    return {
        type: "BRAND_RECEIVED",
        brand: brand
    }
}

export function saveURL(url) {

    console.log("in action:");
    console.dir(url);
    const requestBody = {
        _id: url.brand,
        url: url.url,
    }
    return function(dispatch) {
        dispatch(inFlight());
        return Axios.post(`/api/branded`, requestBody)
            .then(response => dispatch(receiveBrand(response)),
                error => dispatch()
            )
    }
}