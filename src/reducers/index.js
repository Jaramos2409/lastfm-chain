import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import SimilarArtistsReducer from './reducer_similar_artists';

const rootReducer = combineReducers({
    form: formReducer,
    similarArtists: SimilarArtistsReducer
});

export default rootReducer;