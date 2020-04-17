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

function receiveURL(url) {
    console.dir(url)
    return {
        type: "RECEIVED_URL",
        url: url
    }
}
function errorURL(url) {
    return {
        type: "ERROR"
    }
}

export function getURL(url) {
    console.log("in redirect action:");
    console.log(url.hash);
    const key = url.hash;

    return function(dispatch) {
        dispatch(inFlight());
        return Axios.get(`/api/shorten/`.concat(key))
            .then(response => dispatch(receiveURL(response)),
                error => dispatch(errorURL())
            )
    }
}

export function deleteURL(url) {
    console.log("in delete action:");
    console.log(url.hash);
    const key = url.hash;

    return function(dispatch) {
        dispatch(inFlight());
        return Axios.delete(`/api/shorten/`.concat(key).concat('/delete'))
            .then(() => Axios.get(`/api/shorten/`.concat(key))
                .then(response => dispatch(receiveURL(response)),
                    error => dispatch()
                ))
    }
}

export function updateURL(url) {
    const requestBody = {
        url: url.url
    };
    const key = url.hash;
    return function(dispatch) {
        dispatch(inFlight());
        return Axios.put(`/api/shorten/`.concat(key).concat('/edit'), requestBody)
            .then(() => Axios.get(`/api/shorten/`.concat(key))
                .then(response => dispatch(receiveURL(response)),
                    error => dispatch()
                ))
    }
}