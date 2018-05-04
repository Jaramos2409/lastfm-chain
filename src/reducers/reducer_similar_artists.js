import _ from 'lodash';
import { FETCH_SIMILAR_ARTISTS } from '../actions';

export default function(state={}, action) {
    switch(action.type) {
        case FETCH_SIMILAR_ARTISTS:
            console.log(action.payload.firstUserRequest.data.topartists.artist);
            return _.mapKeys(action.payload.firstUserRequest.data.topartists.artist, "name");
        default:
            return state;
    }
}