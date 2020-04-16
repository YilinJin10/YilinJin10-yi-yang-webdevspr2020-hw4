// import Axios from 'axios'
//
// function inFlight() {
//     return {
//         type: "REQUEST_INFLIGHT"
//     }
// }
//
// function receiveURL(url) {
//     console.dir(url)
//     return {
//         type: "RECEIVED_URL",
//         url: url
//     }
// }
//
// export function getURL(url) {
//     console.log("in redirect action:");
//     console.log(url.hash);
//     const key = url.hash;
//
//     return function(dispatch) {
//         dispatch(inFlight());
//         return Axios.get(`/api/shorten/`.concat(key))
//             .then(response => dispatch(receiveURL(response)),
//                 error => dispatch()
//             )
//     }
// }