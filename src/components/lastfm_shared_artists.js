import _ from 'lodash';
import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, CardFooter, CardHeader, CardImgOverlay, CardDeck, Row, Col} from 'reactstrap';
import { BarChart, ColumnChart   } from 'react-chartkick'


class LastFMSharedArtists extends Component {
    render() {
        const { similarArtists, username_1, username_2 } = this.props;

        if (!similarArtists) {
           return <div>Loading...</div>;
        }

        const options = {
            hAxis: { textPosition: 'out' },
            vAxis: { 
                textPosition: 'in',
                gridlines: {color: '#000'},
                textStyle: {
                    color: '#000', 
                    bold: true, 
                    opacity: 0.8
                } 
            },
            colors: ['#f1cccc'],
            chartArea:{
                right:20,
                top:20,
                width:'90%',
                height:'50%',
                backgroundColor: {
                    stroke: '#000',
                    strokeWidth: 1
                }
            },
            backgroundColor: { fill:'transparent' }
        };


        return (
            <div className="sharedArtistsColumns">
                <Row>
                    <Col>
                        <Card className="card-deck-background-section" body>
                        <h4 className="display-4">Your Top 5 Artists {username_2} also enjoys!</h4>
                        <hr className="my-2" />
                            <CardDeck>
                                {_.map(similarArtists, artist => {
                                    return(
                                        <Card key={artist.artist_name+artist.artist_image["#text"]}>
                                            <div className="artist-card">
                                                <CardImg top width="70%" src={artist.artist_image["#text"]} />
                                                <CardFooter><span className="card-header-footer">{artist.artist_name}</span></CardFooter>
                                                <CardBody>
                                                    <BarChart 
                                                        data={[
                                                            [username_1, artist.user_one_artist_playcount],
                                                            [username_2, artist.user_two_artist_playcount]]}
                                                        library={options}
                                                    />
                                                </CardBody>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </CardDeck>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}



export default LastFMSharedArtists;
