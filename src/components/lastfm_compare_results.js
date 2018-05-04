import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArtistSimilar } from '../actions';

class LastFMCompareResults extends Component {

    componentDidMount() {
        // const { username_1, username_2, timeframe } = this.props.params;
        
        console.log("In Compare Results:")
        console.log(this.props.match.params);

        // const values = {
        //     username_1,
        //     username_2,
        //     timeframe
        // }

        // this.props.fetchArtistSimilar(values);
    }

    render() {
        return (
        <div>
            Nothing!
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