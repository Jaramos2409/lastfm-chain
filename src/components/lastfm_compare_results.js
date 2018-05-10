import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArtistSimilar, fetchSharedTopTracks, fetchSharedTopLovedTracks } from '../actions';
import LastFMSharedArtists from './lastfm_shared_artists';
import LastFMSharedTracks from './lastfm_shared_tracks';
import { bindActionCreators } from 'redux';
import { ARTISTS_HEADER, TRACKS_HEADER, ALBUMS_HEADER, LOVED_TRACKS_HEADER } from '../constants';

class LastFMCompareResults extends Component {
    componentDidMount() {
        const { username_1, username_2, timeframe } = this.props.match.params;

        const values = {
            username_1,
            username_2,
            timeframe
        }

        this.props.fetchArtistSimilar(values);
        this.props.fetchSharedTopTracks(values);
        this.props.fetchSharedTopLovedTracks(values);
    }

    renderTimeframe(timeframe) {
        switch(timeframe) {
            case '7day':
                return 'in the past 7 days';
            case '1month':
                return 'in the past month';
            case '3month':
                return 'in the past 3 months';
            case '6month':
                return 'in the past 6 months';
            case '12month':
                return 'in the past year'
            default:
                return 'overall';
        }
    }

    renderHeaderQuantity(size, headerType) {
        var header;

        switch(headerType) {
            case TRACKS_HEADER:
                header = 'tracks';
                break;
            case LOVED_TRACKS_HEADER:
                header = 'loved tracks';
                break;
            case ALBUMS_HEADER: 
                header = 'albums';
                break;
            default:
                header = 'tracks';
                break;
        }

        return size > 1 ? `${size} shared ${header}` : `shared ${header}`;
    }


    render() {
        const { username_1, username_2, timeframe } = this.props.match.params;
        const { similarArtists, sharedTopTracks, sharedLovedTracks } = this.props;

        if(!similarArtists && !sharedTopTracks) {
            return <div>Loading...</div>;
        }

        const sharedLastFMDataRender = (
            <LastFMSharedArtists 
                username_1={username_1} 
                username_2={username_2} 
                timeframe={timeframe}
                noDataHeaderType={ARTISTS_HEADER}
                similarArtists={similarArtists}/>
        );

        const sharedTopTracksDataRender = (
            <LastFMSharedTracks 
                username_1={username_1} 
                username_2={username_2} 
                sharedTopTracks={sharedTopTracks} 
                noDataHeaderType={TRACKS_HEADER}
                header_title={`Top ${this.renderHeaderQuantity(sharedTopTracks.length, TRACKS_HEADER)} ${this.renderTimeframe(timeframe)}!`}/>
        );

        const sharedLovedTracksDataRender = (
            <LastFMSharedTracks 
                username_1={username_1} 
                username_2={username_2} 
                noDataHeaderType={LOVED_TRACKS_HEADER}
                sharedTopTracks={sharedLovedTracks} 
                header_title={`Top ${this.renderHeaderQuantity(sharedLovedTracks.length, LOVED_TRACKS_HEADER)} of all time!`}/>
        );

        return (
            <div className="text-center main">
                {sharedLastFMDataRender}
                {sharedTopTracksDataRender}
                {sharedLovedTracksDataRender}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        similarArtists: state.similarArtists,
        sharedTopTracks: state.sharedTopTracks,
        sharedLovedTracks: state.sharedLovedTracks
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchArtistSimilar, fetchSharedTopTracks, fetchSharedTopLovedTracks}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LastFMCompareResults);