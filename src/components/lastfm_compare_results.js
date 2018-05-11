import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchArtistSimilar, fetchSharedTopTracks, fetchSharedTopLovedTracks, fetchSharedTopAlbums } from '../actions';
import LastFMSharedArtists from './lastfm_shared_artists';
import LastFMTopSixShared from './lastfm_top_six_shared';
import LastFMFooter from './lastfm_footer';
import LastFMShareButtons from './last-fm-share-buttons';
import ScrollToTop from 'react-scroll-up';
import { bindActionCreators } from 'redux';
import { ARTISTS_HEADER, TRACKS_HEADER, ALBUMS_HEADER, LOVED_TRACKS_HEADER } from '../constants';
import { determineTimeframeString } from '../helpers';
import { ScaleLoader } from 'react-spinners';

class LastFMCompareResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true
        }
    }

    componentDidMount() {
        const { username_1, username_2, timeframe } = this.props.match.params;

        console.log(window.location.href);

        const values = {
            username_1,
            username_2,
            timeframe
        }

        this.props.fetchArtistSimilar(values).then(() => {
            this.props.fetchSharedTopAlbums(values).then(() => {
                this.props.fetchSharedTopTracks(values).then(() => {
                    this.props.fetchSharedTopLovedTracks(values).then(() => {
                        this.setState({ loading: false });
                    })
                })
            })
        });
        
        
        // this.props.fetchSharedTopAlbums(values);        
        // this.props.fetchSharedTopTracks(values);
        // this.props.fetchSharedTopLovedTracks(values);
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
        const { similarArtists, sharedTopTracks, sharedLovedTracks, sharedTopAlbums } = this.props;

        const sharedLastFMDataRender = (
            <LastFMSharedArtists 
                username_1={username_1} 
                username_2={username_2} 
                timeframe={timeframe}
                noDataHeaderType={ARTISTS_HEADER}
                similarArtists={similarArtists}/>
        );

        const sharedTopTracksDataRender = (
            <LastFMTopSixShared 
                username_1={username_1} 
                username_2={username_2} 
                timeframe={timeframe}
                sharedTopSixData={sharedTopTracks} 
                noDataHeaderType={TRACKS_HEADER}
                header_title={`Top ${this.renderHeaderQuantity(sharedTopTracks.length, TRACKS_HEADER)} ${determineTimeframeString(timeframe)}!`}/>
        );

        const sharedLovedTracksDataRender = (
            <LastFMTopSixShared 
                username_1={username_1} 
                username_2={username_2} 
                timeframe={timeframe}
                noDataHeaderType={LOVED_TRACKS_HEADER}
                sharedTopSixData={sharedLovedTracks} 
                header_title={`Top ${this.renderHeaderQuantity(sharedLovedTracks.length, LOVED_TRACKS_HEADER)} of all time!`}/>
        );

        const sharedTopAlbumsDataRender = (
            <LastFMTopSixShared 
                username_1={username_1} 
                username_2={username_2} 
                timeframe={timeframe}
                noDataHeaderType={ALBUMS_HEADER}
                sharedTopSixData={sharedTopAlbums} 
                header_title={`Top ${this.renderHeaderQuantity(sharedTopAlbums.length, ALBUMS_HEADER)} ${determineTimeframeString(timeframe)}!`}/>

        );

        const loadingDataRender = (
            <div className='sharedArtistsColumns'>
                <h2 className="display-4"> Loading </h2>
                <ScaleLoader
                    color={'#c1c1c1'} 
                    height={200}
                    width={10}
                    radius={5}
                    loading={this.state.loading} 
                />
            </div>
        );

        const loadedPageRender = (
            <div>
                <LastFMShareButtons shareUrl={window.location.href} />
                <hr className="my-2" />
                {sharedLastFMDataRender}
                {sharedTopAlbumsDataRender}
                {sharedTopTracksDataRender}
                {sharedLovedTracksDataRender}
                <ScrollToTop showUnder={160}>
                    <button className="btn btn-secondary" style={{fontSize: "2em"}}>^</button>
                </ScrollToTop>
                <LastFMFooter/>
            </div>
        );

        return (
            <div className="text-center main">
                {this.state.loading ? loadingDataRender : loadedPageRender}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        similarArtists: state.similarArtists,
        sharedTopTracks: state.sharedTopTracks,
        sharedLovedTracks: state.sharedLovedTracks,
        sharedTopAlbums: state.sharedTopAlbums
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchArtistSimilar, fetchSharedTopTracks, fetchSharedTopLovedTracks, fetchSharedTopAlbums}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LastFMCompareResults);