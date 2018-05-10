import _ from 'lodash';
import React, { Component } from 'react';
import { BarChart } from 'react-chartkick';
import { Card, CardDeck, CardTitle, CardImg, CardImgOverlay, Row, Col, CardSubtitle, CardText } from 'reactstrap';
import LastFMNoData from './lastfm_no_data';


class LastFMSharedTracks extends Component {
    render() {
        const { sharedTopSixData, username_1, username_2, header_title, timeframe, noDataHeaderType } = this.props;

        if (!sharedTopSixData) {
            return <div>Loading...</div>;
         }

         const sharedTopSixRender = (
            <Row>
                <Col>
                    <h3>{header_title}</h3>
                    <hr className="my-2" />
                    <CardDeck>
                        <Card style={{background: 'transparent', border:0, color: '#fff'}} body inverse>
                            <Row>
                                {_.map(sharedTopSixData, topSixListElement => {
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

                                    return(
                                        <Col sm="2" className="p-0 text-left" key={topSixListElement.user_two_playcount+topSixListElement.image}> 
                                            <div className="track-artist-image">
                                                <CardImg top className="img-responsive" width="70%" src={topSixListElement.image['#text']} alt={topSixListElement.artist_name} />
                                            </div>
                                            <CardImgOverlay className="artist_image_overlay">
                                                <a target="_blank" href={topSixListElement.url}>
                                                    <CardSubtitle className="text-left artist-image-text">{topSixListElement.title}</CardSubtitle>
                                                    <CardText className="text-left artist-image-text">{`by ${topSixListElement.artist_name}`}</CardText>
                                                </a>
                                                <BarChart
                                                    data={[
                                                        {
                                                            name: "Scrobbles:", 
                                                            data: [[username_1, topSixListElement.user_one_playcount], [username_2, topSixListElement.user_two_playcount]] 
                                                        }
                                                        ]}
                                                    library={options}
                                                    key={topSixListElement.artist_name+topSixListElement.title}
                                                    />
                                            </CardImgOverlay>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Card>
                    </CardDeck>
                </Col>
            </Row>
        );

        return (
            <div className="sharedArtistsColumns">
                {!(_.isEmpty(sharedTopSixData)) ? sharedTopSixRender :  <LastFMNoData username_1={username_1} username_2={username_2} timeframe={timeframe} noDataHeaderType={noDataHeaderType} />}
            </div>
        );
    }
}



export default LastFMSharedTracks;
