import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import SharedArtistsReducer from './reducer_top_shared_artists';
import SharedTopTracksReducer from './reducer_top_shared_tracks';
import SharedLovedTracksReducer from './reducer_loved_shared_tracks';
import SharedTopAlbumsReducer from './reducer_top_shared_albums';
import VerifyUsernamesValidReducer from './reducer_verify_usernames_valid';


const rootReducer = combineReducers({
    form: formReducer,
    similarArtists: SharedArtistsReducer,
    sharedTopTracks: SharedTopTracksReducer,
    sharedLovedTracks: SharedLovedTracksReducer,
    sharedTopAlbums: SharedTopAlbumsReducer,
    usernameValidation: VerifyUsernamesValidReducer
});

export default rootReducer;