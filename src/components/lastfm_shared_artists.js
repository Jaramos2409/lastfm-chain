import _ from 'lodash';
import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardFooter, CardDeck, Row, Col } from 'reactstrap';
import { BarChart } from 'react-chartkick';
import { USER_PROFILE_URL, ARTIST_PROFILE_URL } from '../constants';
import LastFMNoData from './lastfm_no_data';
import { determineTimeframeString } from '../helpers';


class LastFMSharedArtists extends Component {

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
                        Top {similarArtists.length > 1 ?  `${similarArtists.length} Artists` : 'Artist'} that <a target="_blank" href={`${USER_PROFILE_URL}${username_1}`}>{username_1}</a> and <a target="_blank" href={`${USER_PROFILE_URL}${username_2}`}>{username_2}</a> both enjoy{timeframe !== 'overall' ? 'ed' : ' '} {determineTimeframeString(timeframe)}!
                    </h3>
                    <hr className="my-2" />
                    <CardDeck>
                        {_.map(similarArtists, artist => {
                            return(
                                <Card className="mx-auto" style={{backgroundColor: '#323232', color: '#fff', maxWidth:"18%"}} key={artist.artist_name+artist.image["#text"]} inverse>
                                   <div className="artist_image_overlay">
                                        <a target="_blank" href={`${ARTIST_PROFILE_URL}${artist.artist_name}`}>
                                            <div className="artist-image">
                                                    <CardImg top width="70%" src={artist.image["#text"]} />                                        
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
                                                    data: [[username_1, artist.user_one_playcount], [username_2, artist.user_two_playcount]] 
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
                {!(_.isEmpty(similarArtists)) ? sharedArtistsRender : <LastFMNoData username_1={username_1} username_2={username_2} timeframe={timeframe} noDataHeaderType={noDataHeaderType} /> }
            </div>
        );
    }
}



export default LastFMSharedArtists;
