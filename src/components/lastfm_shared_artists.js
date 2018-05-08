import _ from 'lodash';
import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardHeader, CardDeck, Row, Col} from 'reactstrap';
import { BarChart   } from 'react-chartkick'


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
                        <h2 className="display-4">Your Top 5 Artists {username_2} also enjoys!</h2>
                        <hr className="my-2" />
                        <CardDeck>
                            {_.map(similarArtists, artist => {
                                return(
                                    <Card style={{backgroundColor: '#323232', color: '#fff'}} key={artist.artist_name+artist.artist_image["#text"]}>
                                        <CardHeader className="card-header-footer">{artist.artist_name}</CardHeader>
                                        <CardImg top width="70%" src={artist.artist_image["#text"]} />
                                        <CardBody style={{height: '10em'}}>  
                                            <CardTitle className="h6">Scrobbles:</CardTitle>
                                            <BarChart 
                                                data={[
                                                    [username_1, artist.user_one_artist_playcount],
                                                    [username_2, artist.user_two_artist_playcount]]}
                                                library={options}
                                            />
                                        </CardBody>
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
