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
    const requestBody = {
        _id: url.brand,
        url: url.url,
    }
    return function(dispatch) {
        dispatch(inFlight());
        return Axios.post(`/api/branded`, requestBody)
            .then(response => dispatch(receiveBrand(response)))
    }
}

export function updateURL(url) {
    const requestBody = {
        _id: url.brand,
        url: url.url
    };
    return function(dispatch) {
        dispatch(inFlight());
        return Axios.put(`/api/branded/`.concat(url.brand).concat('/edit'), requestBody)
            .then(() => Axios.get(`/api/branded/`.concat(url.brand))
                .then(response => dispatch(receiveURL(response))))
    }
}

function receiveURL(url) {
    return {
        type: "URL_RECEIVED",
        url: url
    }
}

function errorURL(url) {
    return {
        type: "ERROR_IN_BRANDED"
    }
}

export function getURL(url) {
    console.log("in delete action:");
    console.log(url.brand);
    const key = url.brand;
    return function(dispatch) {
        dispatch(inFlight());
        return Axios.get(`/api/branded/`.concat(key))
            .then(response => dispatch(receiveURL(response)),
                error => dispatch(errorURL(error))
            )
    }
}

export function deleteURL(url) {
    console.log("in delete action:");
    console.log(url.brand);
    const key = url.brand;

    return function(dispatch) {
        dispatch(inFlight());
        return Axios.delete(`/api/branded/`.concat(url.brand).concat('/delete'))
            .then((response) => dispatch(deleteSuccess()))
    }
}

function deleteSuccess() {
    return {
        type: "DELETED_IN_BRANDED"
    }
}