import _ from 'lodash';
import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardFooter, CardDeck, Row, Col } from 'reactstrap';
import { BarChart } from 'react-chartkick';
import { USER_PROFILE_URL, ARTIST_PROFILE_URL } from '../constants';
import LastFMNoData from './lastfm_no_data';


class LastFMSharedArtists extends Component {

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

    render() {
        const { similarArtists, username_1, username_2, timeframe, noDataHeaderType } = this.props;

        if (!similarArtists) {
           return <div>Loading...</div>;
        }

        const options = {
            legend: {position: 'none'},
            animation: {startup: true},
            bar: {groupWidth: "100%"},   
            hAxis: {
                gridlines: {
                    color: 'transparent'
                },
                textPosition: 'none' 
            },
            vAxis: { 
                gridlines: {
                    color: 'transparent'
                },
                textPosition: 'in',
                viewWindowMode: 'pretty',
                textStyle: {
                    color: '#fff', 
                    fontName: 'Segoe UI',
                    bold: true
                }
            },
            colors: ['#4c4c4c'],
            chartArea:{
                right:0,
                top:0,
                width:'100%',
                height:'20%',
            },
            backgroundColor: { fill:'transparent' }
        };

        const sharedArtistsRender =  (
            <Row>
                <Col>
                    <h3>
                        Top {similarArtists.length > 1 ?  `${similarArtists.length} Artists` : 'Artist'} that <a target="_blank" href={`${USER_PROFILE_URL}${username_1}`}>{username_1}</a> and <a target="_blank" href={`${USER_PROFILE_URL}${username_2}`}>{username_2}</a> both enjoy{timeframe !== 'overall' ? 'ed' : ' '} {this.renderTimeframe(timeframe)}!
                    </h3>
                    <hr className="my-2" />
                    <CardDeck>
                        {_.map(similarArtists, artist => {
                            return(
                                <Card className="mx-auto" style={{backgroundColor: '#323232', color: '#fff', maxWidth:"18%"}} key={artist.artist_name+artist.artist_image["#text"]} inverse>
                                   <div className="artist_image_overlay">
                                        <a target="_blank" href={`${ARTIST_PROFILE_URL}${artist.artist_name}`}>
                                            <div className="artist-image">
                                                    <CardImg top width="70%" src={artist.artist_image["#text"]} />                                        
                                            </div>
                                            <div className="bottom-left">
                                                <CardTitle className="text-left artist-image-text">
                                                    {artist.artist_name}
                                                </CardTitle>
                                            </div>
                                        </a>    
                                    </div>
                                    <CardFooter style={{height: '10em'}}>    
                                        <CardTitle className="h6">Scrobbles:</CardTitle>
                                            <BarChart 
                                                data={[{
                                                    name: "Scrobbles:", 
                                                    data: [[username_1, artist.user_one_artist_playcount], [username_2, artist.user_two_artist_playcount]] 
                                                }]}
                                                library={options}
                                            />
                                   </CardFooter>
                                </Card>
                            );
                        })}
                    </CardDeck>
                </Col>
            </Row>
        );

        return (
            <div className="sharedArtistsColumns">
                {!(_.isEmpty(similarArtists)) ? sharedArtistsRender : <LastFMNoData username_1={username_1} username_2={username_2} noDataHeaderType={noDataHeaderType} /> }
            </div>
        );
    }
}



export default LastFMSharedArtists;
