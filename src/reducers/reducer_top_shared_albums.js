import _ from 'lodash';
import { FETCH_SHARED_TOP_ALBUMS } from '../actions';

export default function(state={}, action) {
    switch(action.type) {
        case FETCH_SHARED_TOP_ALBUMS:
            const { firstUserRequest, secondUserRequest } = action.payload;
            const topAlbumsUserOneData = _.mapKeys(firstUserRequest.data.topalbums.album, "name");
            const topAlbumsUserTwoData = _.mapKeys(secondUserRequest.data.topalbums.album, "name");
            let sharedAlbums = _.intersection(_.keys(topAlbumsUserOneData), _.keys(topAlbumsUserTwoData));

            if(sharedAlbums.length > 0) {
                var listOfRanges = [];
                sharedAlbums = _.chain(sharedAlbums)
                    .sortBy(album_name => {
                        let range = Math.abs(+topAlbumsUserOneData[album_name].playcount - +topAlbumsUserTwoData[album_name].playcount);
                        listOfRanges.push(range);
                        return range;
                    })
                    .orderBy(album_name => {
                        return +topAlbumsUserOneData[album_name].playcount + +topAlbumsUserTwoData[album_name].playcount;
                    }, "desc")
                    .thru(albumList => {
                        var meanOfRanges = _.mean(listOfRanges);
                        return _.remove(albumList, album_name => {
                            const range = Math.abs(+topAlbumsUserOneData[album_name].playcount - +topAlbumsUserTwoData[album_name].playcount)
                            return range < meanOfRanges || range < 5;
                        });
                    })
                    .value();
            
                if(sharedAlbums.length>6) sharedAlbums.length = 6;
                else if (sharedAlbums.length < 1) return state;

                return _.map(sharedAlbums, album_name => {
                    return {
                        title: topAlbumsUserOneData[album_name].name,
                        artist_name: topAlbumsUserOneData[album_name].artist.name,
                        user_one_playcount:  topAlbumsUserOneData[album_name].playcount,
                        user_two_playcount:  topAlbumsUserTwoData[album_name].playcount,
                        url:  topAlbumsUserOneData[album_name].url,
                        image: _.mapKeys(topAlbumsUserOneData[album_name].image, "size")["extralarge"]
                    };
                });
            } else {
                return state;
            }
        default:
            return state;
    }
}