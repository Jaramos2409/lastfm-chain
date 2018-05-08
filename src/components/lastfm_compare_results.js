import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArtistSimilar } from '../actions';
import LastFMSharedArtists from './lastfm_shared_artists';

class LastFMCompareResults extends Component {

    componentDidMount() {
        const { username_1, username_2, timeframe } = this.props.match.params;

        const values = {
            username_1,
            username_2,
            timeframe
        }

        this.props.fetchArtistSimilar(values);
    }

    render() {
        const { username_1, username_2 } = this.props.match.params;
        const { similarArtists } = this.props;

        const sharedLastFMDataRender = (
            <LastFMSharedArtists username_1={username_1} username_2={username_2} similarArtists={similarArtists}/>
        );

        if(!similarArtists) {
            return <div>Loading...</div>;
        }

        return (
        <div>
            <div className="text-center main">
                {sharedLastFMDataRender}
            </div>
        </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        similarArtists: state.similarArtists
    };
}

export default connect(mapStateToProps,{ fetchArtistSimilar })(LastFMCompareResults);