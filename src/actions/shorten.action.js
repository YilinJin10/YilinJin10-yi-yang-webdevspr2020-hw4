import Axios from 'axios'

function loadingURL() {
    return {
        type: "REQUEST_URL"
    }
}

function receiveURL(pokemons) {
    return {
        type: "RECEIVE_URL",
        pokemons
    }
}

function inFlight() {
    return {
        type: "REQUEST_INFLIGHT"
    }
}


// export function fetchPokemon(username) {
//     return function(dispatch) {
//         dispatch(loadingPokemons());
//         return Axios.get(`/api/pokemon?username=${username}`)
//             .then(response => dispatch(receivePokemonList(response.data)),
//                 error => console.log('An error occurred.', error)
//             );
//     }
// }

// export function addURL(url) {
//     return function(dispatch) {
//         dispatch(inFlight());
//         return Axios.post(`/api/shorten`, url)
//             .then(() => Axios.get(`/api/pokemon?username=${username}`),
//                 error => console.log('An error occurred.', error))
//             .then(
//                 response => dispatch(receivePokemonList(response.data)),
//                 error => console.log('An error occurred.', error)
//             )
//     }
// }

// export function deletePokemon(pokemonId, username) {
//     return function(dispatch) {
//         dispatch(inFlight());
//         return Axios.delete(`/api/pokemon/` + pokemonId)
//             .then(() => Axios.get(`/api/pokemon?username=${username}`),
//                 error => console.log('An error occurred.', error))
//             .then(
//                 response => dispatch(receivePokemonList(response.data)),
//                 error => console.log('An error occurred.', error)
//             )
//     }
// }

export function addURL(url){
    console.log(url);
    const requestBody = {
        url: url
    }
    return function(dispatch) {
        dispatch(inFlight());
        return Axios.post(`/api/shorten`, requestBody)
            .then(
                // () => dispatch(fetchRegistrationCourses()),
                error => console.log('An error occurred.', error)
            )
    }
}