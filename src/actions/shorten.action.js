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

function sendFailure(error) {
    return {
        type: "SEND_FAILURE",
        error
    }
}

export function saveURL(url) {
    console.log(url);
    const requestBody = {
        url: url.url
    }
    return function (dispatch) {
        dispatch(sendAttempt());
        return Axios.post('/api/shorten', requestBody)
            .then(response => dispatch(sendSuccess(response.url)),
                error => dispatch(loginFailure(error.response))
            );
    }
}