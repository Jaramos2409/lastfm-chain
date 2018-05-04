import {ROOT_URL, API_KEY} from '../api/API_KEY';
import axios from 'axios';

export const FETCH_SIMILAR_ARTISTS = 'fetch_similar_artists';

export function fetchArtistSimilar(values) {
    const { username_1, username_2, timeframe} = values;

    function getUserData(username) {
        return axios.get(`${ROOT_URL}?method=user.gettopartists&user=${username}&api_key=${API_KEY}&format=json`);
    }

    var firstUserRequest = getUserData(username_1);
    var secondUserRequest = getUserData(username_2);

    const response = Promise.all([ firstUserRequest, secondUserRequest ])
                .then( ([ firstUserRequest, secondUserRequest ]) => {
                   return { firstUserRequest, secondUserRequest }
                });

    return {
        type: FETCH_SIMILAR_ARTISTS,
        payload: response
    };
}