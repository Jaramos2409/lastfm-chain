import _ from 'lodash';
import { FETCH_SIMILAR_ARTISTS } from '../actions';

export default function(state={}, action) {
    switch(action.type) {
        case FETCH_SIMILAR_ARTISTS:
            var { firstUserRequest: firstUserRequest_similar_artists, secondUserRequest: secondUserRequest_similar_artists } = action.payload;
            const topArtistsUserOneData = _.mapKeys(firstUserRequest_similar_artists.data.topartists.artist, "name");
            const topArtistsUserTwoData = _.mapKeys(secondUserRequest_similar_artists.data.topartists.artist, "name");
            let sharedArtists = _.intersection(_.keys(topArtistsUserOneData), _.keys(topArtistsUserTwoData));

            if(sharedArtists.length > 0) {
                var listOfRangesBetweenScrobbles = [];
                sharedArtists = _.chain(sharedArtists)
                    .sortBy(artist_name => {
                        let range = Math.abs(+topArtistsUserOneData[artist_name].playcount - +topArtistsUserTwoData[artist_name].playcount);
                        listOfRangesBetweenScrobbles.push(range);
                        return range;
                    })
                    .orderBy(artist_name => {
                        return +topArtistsUserOneData[artist_name].playcount + +topArtistsUserTwoData[artist_name].playcount;
                    }, "desc")
                    .thru(artistList => {
                        var meanOfRanges = _.mean(listOfRangesBetweenScrobbles);
                        return _.remove(artistList, artist_name => {
                            const range = Math.abs(+topArtistsUserOneData[artist_name].playcount - +topArtistsUserTwoData[artist_name].playcount);
                            return range < meanOfRanges || range < 5;
                        });
                    })
                    .value();
            
                if(sharedArtists.length>5) sharedArtists.length = 5;
                else if (sharedArtists.length < 1) return state;

                return _.map(sharedArtists, artist_name => {
                    return {
                        artist_name,
                        user_one_playcount:  topArtistsUserOneData[artist_name].playcount,
                        user_two_playcount:  topArtistsUserTwoData[artist_name].playcount,
                        image: _.mapKeys(topArtistsUserTwoData[artist_name].image, "size")["mega"]
                    };
                });
            } else {
                return state;
            }
        default:
            return state;
    }
}