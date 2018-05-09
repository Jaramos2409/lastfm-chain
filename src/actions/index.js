import {API_KEY} from '../api/API_KEY';
import { ROOT_API_URL } from '../constants';
import axios from 'axios';

export const FETCH_SIMILAR_ARTISTS = 'fetch_similar_artists';
export const FETCH_SHARED_TOP_TRACKS = 'fetch_shared_top_tracks';


export function fetchArtistSimilar(values) {
    const { username_1, username_2, timeframe} = values;

    function getUserData(username) {
        return axios.get(`${ROOT_API_URL}?method=user.gettopartists&user=${username}&period=${timeframe}&limit=1000&api_key=${API_KEY}&format=json`);
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

export function fetchSharedTopArtists(values) {
    const { username_1, username_2, timeframe} = values;

    function getUserData(username) {
        return axios.get(`${ROOT_API_URL}?method=user.gettoptracks&user=${username}&period=${timeframe}&limit=1000&api_key=${API_KEY}&format=json`);
    }

    var firstUserRequest = getUserData(username_1);
    var secondUserRequest = getUserData(username_2);

    const response = Promise.all([ firstUserRequest, secondUserRequest ])
                .then( ([ firstUserRequest, secondUserRequest ]) => {
                   return { firstUserRequest, secondUserRequest }
                });

    return {
        type: FETCH_SHARED_TOP_TRACKS,
        payload: response
    };
}

