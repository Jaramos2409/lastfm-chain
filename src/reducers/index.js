import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import SharedArtistsReducer from './reducer_top_shared_artists';
import SharedTracksReducer from './reducer_top_shared_tracks';

const rootReducer = combineReducers({
    form: formReducer,
    similarArtists: SharedArtistsReducer,
    sharedTopTracks: SharedTracksReducer
});

export default rootReducer;