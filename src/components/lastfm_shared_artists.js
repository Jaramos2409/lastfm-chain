import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardTitle, CardText, CardFooter, CardImgOverlay, CardDeck, Row, Col } from 'reactstrap';
import { BarChart } from 'react-chartkick';
import { USER_PROFILE_URL, ARTIST_PROFILE_URL } from '../constants';


class LastFMSharedArtists extends Component {

    render() {
        const { similarArtists, username_1, username_2 } = this.props;

        if (!similarArtists) {
           return <div>Loading...</div>;
        }

        const options = {
            bar: {groupWidth: "95%"},   
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
                width:'90%',
                height:'20%',
            },
            backgroundColor: { fill:'transparent' }
        };

        const sharedArtistsRender =  (
            <Row>
                <Col>
                    <h2 className="display-4">Top {similarArtists.length > 1 ?  `${similarArtists.length} Artists` : 'Artist'} that <a target="_blank" href={`${USER_PROFILE_URL}${username_1}`}>{username_1}</a> and <a target="_blank" href={`${USER_PROFILE_URL}${username_2}`}>{username_2}</a> both enjoy!</h2>
                    <hr className="my-2" />
                    <CardDeck>
                        {_.map(similarArtists, artist => {
                            return(
                                <Card className="mx-auto" style={{backgroundColor: '#323232', color: '#fff', maxWidth:"18%"}} key={artist.artist_name+artist.artist_image["#text"]} inverse>
                                    <CardImg top width="70%" src={artist.artist_image["#text"]} />                                        
                                    <a target="_blank" href={`${ARTIST_PROFILE_URL}${artist.artist_name}`}>
                                        <CardImgOverlay className="artist_image_overlay">
                                                <CardTitle className="h2 ">{artist.artist_name}</CardTitle>
                                        </CardImgOverlay>
                                    </a>
                                    <CardFooter style={{height: '10em'}}>  
                                        <CardTitle className="h6">Scrobbles:</CardTitle>
                                        <BarChart 
                                            data={[
                                                [username_1, artist.user_one_artist_playcount],
                                                [username_2, artist.user_two_artist_playcount]]}
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

        const noSharedArtistsRender = (
            <Row>
                <Col>
                    <h2 className="display-4"><a target="_blank" href={`${USER_PROFILE_URL}${username_1}`}>{username_1}</a> and <a target="_blank" href={`${USER_PROFILE_URL}${username_2}`}>{username_2}</a> don't share any artists!</h2>
                    <hr className="my-2" />
                    <CardDeck>
                        <Card body className="mx-auto text-center" style={{backgroundColor: '#323232', color: '#fff', maxWidth:"18%"}} >
                            <CardTitle>Please try again.</CardTitle>
                            <CardText>Try a different time frame. If that doesn't work, then you and your friend are just too different!</CardText>
                            <Link to="/" className="btn btn-secondary">Go back</Link>
                        </Card>
                    </CardDeck>
                </Col>
            </Row>
        );

        return (
            <div className="sharedArtistsColumns">
                {!(_.isEmpty(similarArtists)) ? sharedArtistsRender : noSharedArtistsRender}
            </div>
        );
    }
}



export default LastFMSharedArtists;
