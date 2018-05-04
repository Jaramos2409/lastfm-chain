import _ from 'lodash';
import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, CardGroup } from 'reactstrap';

class LastFMSharedArtists extends Component {
    render() {
        const { similarArtists } = this.props;

        if (!similarArtists) {
           return <div></div>;
        }

        return (
            <div>
                <CardGroup>
                    {_.map(similarArtists, artist => {
                        return(
                            <Card key={artist.artist_name+artist.artist_image["#text"]}>
                                <CardImg top width="100%" src={artist.artist_image["#text"]} />
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                </CardBody>
                            </Card>
                        );
                    })}
                </CardGroup>
            </div>
        );
    }
}

export default LastFMSharedArtists;
