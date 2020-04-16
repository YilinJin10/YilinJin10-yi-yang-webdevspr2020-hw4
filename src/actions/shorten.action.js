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

function receiveHash(hash) {
    return {
        type: "HASH_RECEIVED",
        hash: hash
    }
}

export function saveURL(url) {
    console.log(url);
    const requestBody = {
        url: url.url
    }
    return function(dispatch) {
        dispatch(inFlight());
        return Axios.post(`/api/shorten`, requestBody)
            .then(response => dispatch(receiveHash(response)),
                error => dispatch()
            )
    }
}