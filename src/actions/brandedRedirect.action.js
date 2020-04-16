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
//         type: "URL_RECEIVED",
//         url: url
//     }
// }
//
// export function getURL(url) {
//     console.log("in redirect action:");
//     console.log(url.brand);
//     const key = url.brand;
//
//     return function(dispatch) {
//         dispatch(inFlight());
//         return Axios.get(`/api/branded/`.concat(key))
//             .then(response => dispatch(receiveURL(response)),
//                 error => dispatch()
//             )
//     }
// }