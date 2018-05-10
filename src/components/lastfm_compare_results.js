import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArtistSimilar, fetchSharedTopArtists } from '../actions';
import { CardDeck, Row, Col } from 'reactstrap';
import LastFMSharedArtists from './lastfm_shared_artists';
import LastFMSharedTracks from './lastfm_shared_tracks';
import { bindActionCreators } from 'redux';

class LastFMCompareResults extends Component {

    componentDidMount() {
        const { username_1, username_2, timeframe } = this.props.match.params;

        const values = {
            username_1,
            username_2,
            timeframe
        }

        this.props.fetchArtistSimilar(values);
        this.props.fetchSharedTopArtists(values);
    }

    render() {
        const { username_1, username_2, timeframe } = this.props.match.params;
        const { similarArtists } = this.props;
        const { sharedTopTracks } = this.props;

        if(!similarArtists && !sharedTopTracks) {
            return <div>Loading...</div>;
        }

        const sharedLastFMDataRender = (
            <LastFMSharedArtists 
                username_1={username_1} 
                username_2={username_2} 
                timeframe={timeframe}
                similarArtists={similarArtists}/>
        );

        const sharedTopTracksDataRender = (
            <LastFMSharedTracks 
                username_1={username_1} 
                username_2={username_2} 
                sharedTopTracks={sharedTopTracks} />
        );

        return (
            <div className="text-center main">
                {sharedLastFMDataRender}
                {sharedTopTracksDataRender}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        similarArtists: state.similarArtists,
        sharedTopTracks: state.sharedTopTracks
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchArtistSimilar, fetchSharedTopArtists}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LastFMCompareResults);