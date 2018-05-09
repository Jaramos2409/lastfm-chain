import _ from 'lodash';
import React, { Component } from 'react';
import { BarChart } from 'react-chartkick';
import { Card, CardBody, CardTitle, CardText, CardHeader, CardImg, CardImgOverlay, Row, Col, CardFooter, CardSubtitle } from 'reactstrap';

class LastFMSharedTracks extends Component {
    render() {
        const { sharedTopTracks, username_1, username_2 } = this.props;

        return (
                <Card style={{backgroundColor: '#323232', color: '#fff', maxWidth:"18%", minWidth:"18%"}} body inverse>
                    <CardTitle>Top 5 Tracks!</CardTitle>
                        {_.map(sharedTopTracks, track => {
                            var options = {
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
                                    top:30,
                                    width:'100%',
                                    height:'18%',
                                },
                                backgroundColor: { fill:'transparent' }
                            };

                            console.log(track);
                            return(
                                <Row key={track.artist_image}>
                                    <Col className="p-0 text-left">
                                        <div className="track-artist-image">
                                            <CardImg top className="img-responsive" width="70%" src={track.artist_image['#text']} alt={track.artist_name} />
                                        </div>
                                            <CardImgOverlay className="artist_image_overlay">
                                                <CardTitle className="text-left artist-image-text">{track.song_title}</CardTitle>
                                                <CardSubtitle className="text-left artist-image-text">{`by ${track.artist_name}`}</CardSubtitle>
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
                                            </CardImgOverlay>
                                    </Col>
                                </Row>
                            );
                        })}
                </Card>
        );
    }
}



export default LastFMSharedTracks;
