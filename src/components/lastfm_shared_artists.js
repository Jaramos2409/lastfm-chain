import _ from 'lodash';
import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardFooter, CardImgOverlay, CardHeader, CardDeck, Row, Col} from 'reactstrap';
import { BarChart   } from 'react-chartkick';
import { USER_PROFILE_URL, ARTIST_PROFILE_URL} from '../api/API_KEY';


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

        return (
            <div className="sharedArtistsColumns">
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
                                                    <CardTitle>{artist.artist_name}</CardTitle>
                                            </CardImgOverlay>
                                        </a>
                                        <CardFooter style={{height: '10em'}}>  
                                            <CardTitle className="h6">Scrobbles:</CardTitle>
                                            <BarChart 
                                                data={[
                                                    [username_1, artist.user_one_artist_playcount, "RED"],
                                                    [username_2, artist.user_two_artist_playcount, 'BLUE']]}
                                                library={options}
                                            />
                                        </CardFooter>
                                    </Card>
                                );
                            })}
                        </CardDeck>
                    </Col>
                </Row>
            </div>
        );
    }
}



export default LastFMSharedArtists;
