import _ from 'lodash';
import { FETCH_SHARED_TOP_TRACKS } from '../actions';

export default function(state={}, action) {
    switch(action.type) {
        case FETCH_SHARED_TOP_TRACKS:
            const { firstUserRequest, secondUserRequest } = action.payload;
            const topTracksUserOneData = _.mapKeys(firstUserRequest.data.toptracks.track, "name");
            const topTracksUserTwoData = _.mapKeys(secondUserRequest.data.toptracks.track, "name");
            let sharedTracks = _.intersection(_.keys(topTracksUserOneData), _.keys(topTracksUserTwoData));

            if(sharedTracks.length > 0) {
                var listOfRanges = [];
                sharedTracks = _.chain(sharedTracks)
                    .sortBy(track_name => {
                        let range = Math.abs(+topTracksUserOneData[track_name].playcount - +topTracksUserTwoData[track_name].playcount);
                        listOfRanges.push(range);
                        return range;
                    })
                    .orderBy(track_name => {
                        return +topTracksUserOneData[track_name].playcount + +topTracksUserTwoData[track_name].playcount;
                    }, "desc")
                    .thru(trackList => {
                        var meanOfRanges = _.mean(listOfRanges);
                        return _.remove(trackList, track_name => {
                            return Math.abs(+topTracksUserOneData[track_name].playcount - +topTracksUserTwoData[track_name].playcount) < meanOfRanges;
                        });
                    })
                    .value();
            
                if(sharedTracks.length>6) sharedTracks.length = 6;
                else if (sharedTracks.length < 1) return state;

                return _.map(sharedTracks, track_name => {
                    return {
                        title: topTracksUserOneData[track_name].name,
                        artist_name: topTracksUserOneData[track_name].artist.name,
                        user_one_playcount:  topTracksUserOneData[track_name].playcount,
                        user_two_playcount:  topTracksUserTwoData[track_name].playcount,
                        url:  topTracksUserOneData[track_name].url,
                        image: _.mapKeys(topTracksUserOneData[track_name].image, "size")["extralarge"]
                    };
                });
            } else {
                return state;
            }
        default:
            return state;
    }
}