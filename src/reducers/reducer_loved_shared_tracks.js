import _ from 'lodash';
import { FETCH_SHARED_LOVED_TRACKS } from '../actions';

export default function(state={}, action) {
    switch(action.type) {
        case FETCH_SHARED_LOVED_TRACKS:
            const { firstUserTopTracksRequest, secondUserTopTracksRequest, firstUserLovedTracksRequest, secondUserLovedTracksRequest } = action.payload;
            
            const topTracksUserOneData = _.mapKeys(firstUserTopTracksRequest.data.toptracks.track, "name");
            const topTracksUserTwoData = _.mapKeys(secondUserTopTracksRequest.data.toptracks.track, "name");
            const sharedTracksUserOneData = _.mapKeys(firstUserLovedTracksRequest.data.lovedtracks.track, "name");
            const sharedTracksUserTwoData = _.mapKeys(secondUserLovedTracksRequest.data.lovedtracks.track, "name");

            let sharedTopTracks = _.intersection(_.keys(topTracksUserOneData), _.keys(topTracksUserTwoData));
            let sharedLovedTracks = _.intersection(_.keys(sharedTracksUserOneData), _.keys(sharedTracksUserTwoData));

            if(sharedTopTracks.length > 0 && sharedLovedTracks.length > 0) {
                sharedTopTracks = _.remove(sharedTopTracks, track_name => {
                    return sharedLovedTracks.includes(track_name);
                });

                var listOfRanges = [];
                sharedTopTracks = _.chain(sharedTopTracks)
                    .sortBy(track_name => {
                        let range = Math.abs(+topTracksUserOneData[track_name].playcount - +topTracksUserTwoData[track_name].playcount);
                        listOfRanges.push(range);
                        return range;
                    })
                    .orderBy(track_name => {
                        return +topTracksUserOneData[track_name].playcount + +topTracksUserTwoData[track_name].playcount;
                    }, "desc")
                    .value();

                if(sharedTopTracks.length>6) sharedTopTracks.length = 6;
                else if (sharedTopTracks.length < 1) return state;

                return _.map(sharedTopTracks, track_name => {
                    return {
                        song_title: topTracksUserOneData[track_name].name,
                        artist_name: topTracksUserOneData[track_name].artist.name,
                        user_one_artist_playcount:  topTracksUserOneData[track_name].playcount,
                        user_two_artist_playcount:  topTracksUserTwoData[track_name].playcount,
                        track_url:  topTracksUserOneData[track_name].url,
                        artist_image: _.mapKeys(topTracksUserOneData[track_name].image, "size")["extralarge"]
                    };
                });
            } else {
                return state;
            }
        default:
            return state;
    }
}