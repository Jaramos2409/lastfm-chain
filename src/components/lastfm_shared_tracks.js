import _ from 'lodash';
import React, { Component } from 'react';
import { BarChart } from 'react-chartkick';
import { Card, CardBody, CardTitle, CardHeader, CardImg, CardImgOverlay, Row, Col } from 'reactstrap';

class LastFMSharedTracks extends Component {
    render() {
        const { sharedTopTracks, username_1, username_2 } = this.props;

        return (
                <Card style={{backgroundColor: '#323232', color: '#fff', maxWidth:"36%", minWidth:"36%"}}>
                    <CardHeader>Top 5 Tracks {username_1} and {username_2} both enjoy!</CardHeader>
                        {_.map(sharedTopTracks, track => {
                            var options = {
                                title: `${track.song_title}\nby ${track.artist_name}`,
                                subtitle: 'nerd',
                                titleTextStyle: {
                                    color: '#fff',
                                    fontName: 'Open Sans',
                                    fontSize: '14'
                                },
                                legend: { position: 'none' },
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
                                    right:50,
                                    left:0,
                                    top:40,
                                    width:'100%',
                                    height:'18%',
                                },
                                backgroundColor: { fill:'transparent' },
                                series: {
                                    0: { axis: 'distance' }, // Bind series 0 to an axis named 'distance'.
                                    1: { axis: 'brightness' } // Bind series 1 to an axis named 'brightness'.
                                  },
                            };

                            console.log(track);
                            return(
                                    <Row key={track.artist_image} style={{ height: '8.2em'}}>
                                        <Col xs="3" >
                                            <CardImg top width="70%" src={track.artist_image['#text']} alt={track.artist_name} />
                                        </Col>
                                        <Col xs="9" >
                                            <CardBody >
                                                <BarChart
                                                    data={[
                                                        {
                                                            name: "Scrobbles:", 
                                                            data: [[username_1, track.user_one_artist_playcount], [username_2, track.user_two_artist_playcount]] 
                                                        }
                                                        ]}
                                                    library={options}
                                                    key={track.artist_name+track.song_title}
                                                />
                                            </CardBody>
                                        </Col>
                                    </Row>
                            );
                        })}
                </Card>
        );
    }
}



export default LastFMSharedTracks;
