import {API_KEY} from '../api/API_KEY';
import { ROOT_API_URL } from '../constants';
import axios from 'axios';

export const FETCH_SIMILAR_ARTISTS = 'fetch_similar_artists';
export const FETCH_SHARED_TOP_TRACKS = 'fetch_shared_top_tracks';
export const FETCH_SHARED_LOVED_TRACKS = 'fetch_shared_loved_tracks';
export const FETCH_SHARED_TOP_ALBUMS = 'fetch_shared_top_albums';
export const VERIFY_USERNAME_VALID = 'verify_username_valid';


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

export function fetchSharedTopTracks(values) {
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

export function fetchSharedTopLovedTracks(values) {
    const { username_1, username_2} = values;

    function getUserTopTracksData(username) {
        return axios.get(`${ROOT_API_URL}?method=user.gettoptracks&user=${username}&limit=1000&api_key=${API_KEY}&format=json`);
    }

    function getUserLovedTracksData(username) {
        return axios.get(`${ROOT_API_URL}?method=user.getlovedtracks&user=${username}&limit=1000&api_key=${API_KEY}&format=json`);
    }

    var firstUserTopTracksRequest = getUserTopTracksData(username_1);
    var secondUserTopTracksRequest = getUserTopTracksData(username_2);
    var firstUserLovedTracksRequest = getUserLovedTracksData(username_1);
    var secondUserLovedTracksRequest = getUserLovedTracksData(username_2);

    const response = Promise.all([ firstUserTopTracksRequest, secondUserTopTracksRequest, firstUserLovedTracksRequest, secondUserLovedTracksRequest ])
                .then( ([ firstUserTopTracksRequest, secondUserTopTracksRequest, firstUserLovedTracksRequest, secondUserLovedTracksRequest ]) => {
                   return { firstUserTopTracksRequest, secondUserTopTracksRequest, firstUserLovedTracksRequest,  secondUserLovedTracksRequest}
                });

    return {
        type: FETCH_SHARED_LOVED_TRACKS,
        payload: response
    };
}

export function fetchSharedTopAlbums(values) {
    const { username_1, username_2, timeframe} = values;

    function getUserData(username) {
        return axios.get(`${ROOT_API_URL}?method=user.gettopalbums&user=${username}&period=${timeframe}&limit=1000&api_key=${API_KEY}&format=json`);
    }

    var firstUserRequest = getUserData(username_1);
    var secondUserRequest = getUserData(username_2);

    const response = Promise.all([ firstUserRequest, secondUserRequest ])
                .then( ([ firstUserRequest, secondUserRequest ]) => {
                   return { firstUserRequest, secondUserRequest }
                });

    return {
        type: FETCH_SHARED_TOP_ALBUMS,
        payload: response
    };
}

export function verifyUsernameValid(values) {
    const { username_1, username_2 } = values;

    function getUserData(username) {
        return axios.get(`${ROOT_API_URL}?method=user.getInfo&user=${username}&api_key=${API_KEY}&format=json`);
    }

    var firstUserRequest = getUserData(username_1);
    var secondUserRequest = getUserData(username_2);

    const response = Promise.all([ firstUserRequest, secondUserRequest ])
                .then( ([ firstUserRequest, secondUserRequest ]) => {
                   return { firstUserRequest, secondUserRequest }
                });

    return {
        type: VERIFY_USERNAME_VALID,
        payload: response
    };
}