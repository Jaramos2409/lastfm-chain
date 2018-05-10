import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText, CardDeck, Row, Col } from 'reactstrap';
import { USER_PROFILE_URL } from '../constants';

const LastFMNoData = ({username_1, username_2, noDataHeaderType}) => {
    var headerType;

    switch(noDataHeaderType) {
        case 'artists':
            headerType = 'artists';
            break;
        case 'tracks':
            headerType = 'tracks';
            break;
        case 'loved':
            headerType = 'loved tracks';
            break;
        case 'albums': 
            headerType = 'albums';
            break;
        default:
            headerType = 'artists';
            break;
    }

    return (
            <Row>
                <Col>
                    <h3><a target="_blank" href={`${USER_PROFILE_URL}${username_1}`}>{username_1}</a> and <a target="_blank" href={`${USER_PROFILE_URL}${username_2}`}>{username_2}</a> don't share any {headerType}!</h3>
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
}


export default LastFMNoData;