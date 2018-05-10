import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import SharedArtistsReducer from './reducer_top_shared_artists';
import SharedTopTracksReducer from './reducer_top_shared_tracks';
import SharedLovedTracksReducer from './reducer_loved_shared_tracks';
import SharedTopAlbumsReducer from './reducer_top_shared_albums';

const rootReducer = combineReducers({
    form: formReducer,
    similarArtists: SharedArtistsReducer,
    sharedTopTracks: SharedTopTracksReducer,
    sharedLovedTracks: SharedLovedTracksReducer,
    sharedTopAlbums: SharedTopAlbumsReducer
});

export default rootReducer;