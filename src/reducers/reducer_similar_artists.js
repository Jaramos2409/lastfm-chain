import _ from 'lodash';
import { FETCH_SIMILAR_ARTISTS } from '../actions';

export default function(state={}, action) {
    switch(action.type) {
        case FETCH_SIMILAR_ARTISTS:
            let topArtistsUserOneData = _.mapKeys(action.payload.firstUserRequest.data.topartists.artist, "name");
            let topArtistsUserTwoData = _.mapKeys(action.payload.secondUserRequest.data.topartists.artist, "name");   
            let sharedSimilarArtists = _.intersection(_.keys(topArtistsUserOneData), _.keys(topArtistsUserTwoData));
            
            if(sharedSimilarArtists.length>6) sharedSimilarArtists.length = 6;
            else if (sharedSimilarArtists.length < 1) return state;
            
            return _.map(sharedSimilarArtists, artist_name => {
                return {
                    artist_name,
                    user_one_artist_playcount:  topArtistsUserOneData[artist_name].playcount,
                    user_two_artist_playcount:  topArtistsUserTwoData[artist_name].playcount,
                    artist_image: _.mapKeys(topArtistsUserTwoData[artist_name].image, "size")["large"]
                };
            });
        default:
            return state;
    }
}