import _ from 'lodash';
import React, { Component } from 'react';
import { Col, Input, FormGroup, Form, Row, Card, CardDeck, CardText, CardSubtitle, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { verifyUsernameValid } from '../actions';
import { Fields, reduxForm, SubmissionError } from 'redux-form';
import { USER_PROFILE_URL } from '../constants';
import { bindActionCreators } from 'redux';

class LastFMChainIndex extends Component {

    renderFields(fields) {
        const timeframeOptions = [
            {
                title: 'Overall',
                value: 'overall',
            },
            {
                title: '1 Week',
                value: '7day',
            },
            {
                title: '1 Month',
                value: '1month',
            },
            {
                title: '3 Months',
                value: '3month',
            },
            {
                title: '6 Months',
                value: '6month',
            },
            {
                title: 'Past Year',
                value: '12month',
            }
        ];

        return ( 
            <div>
                <FormGroup className={`d-inline mb-2 mr-sm-2 mb-sm-0`}>
                    <Input 
                        className="form-control"
                        type="text"
                        placeholder="Your Last.fm Username"
                        {...fields.username_1.input}
                    />
                </FormGroup>
                <FormGroup  className={`d-inline mb-2 mr-sm-2 mb-sm-0`}>
                    <Input 
                        className="form-control"
                        type="text"
                        placeholder="Your Friend's Username"
                        {...fields.username_2.input}
                    />
                </FormGroup>
                <FormGroup className="d-inline">
                    <Input name={`dropdown_${fields.timeframe.label}`} value="overall" type="select" className={`d-inline mb-2 mr-sm-2 mb-sm-0 ${fields.timeframe.meta.touched && fields.timeframe.meta.error ? 'has-danger' : ''}`} {...fields.timeframe.input}>
                        {_.map(timeframeOptions, choice => {
                            return (
                                <option key={choice.title} value={choice.value}> 
                                    {choice.title}
                                </option>
                            );
                        })}
                    </Input>
                </FormGroup>
                <Button type="submit" className="d-inline float-right">Submit</Button>
                <div className="text-help">
                    {fields.username_1.meta.touched && fields.username_1.meta.error && <span className="last-fm-red-text ">{fields.username_1.meta.error}</span>}
                </div>
                <div className="text-help">
                    {fields.username_2.meta.touched && fields.username_2.meta.error && <span className="last-fm-red-text ">{fields.username_2.meta.error}</span>}
                </div>
                <div className="text-help">
                    {fields.timeframe.meta.touched && fields.timeframe.meta.error && <span className="last-fm-red-text ">{fields.timeframe.meta.error}</span>}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        return this.props.verifyUsernameValid(values).then(() => {
            const { isUserOneValid, isUserTwoValid } = this.props.usernameValidation;

            if (!isUserOneValid) {
                throw new SubmissionError({
                    username_1: 'User one does not exist',
                    _error: 'Please use a valid Last.fm username!'
                })
            } 
            if (!isUserTwoValid) {
                throw new SubmissionError({
                    username_2: 'User two does not exist',
                    _error: 'Please use a valid Last.fm username!'
                })
            }
            if (isUserOneValid && isUserTwoValid) {
                this.props.history.push(`/${values.username_1}/${values.username_2}/${!values.timeframe ? 'overall' : values.timeframe}`);
            }
        });
    }

    

    render() {
        const { handleSubmit, error } = this.props;

        return (
            <div className="text-center main">
                <div className="sharedArtistsColumns">
                    <Row>
                        <Col>
                            <CardDeck>
                                <Card className="mx-auto" style={{backgroundColor: '#323232', color: '#fff', maxWidth:"60%"}} body>
                                    <CardSubtitle>Input the two usernames you wish to compare (i.e. <a target="_blank" rel="noopener noreferrer" href={`${USER_PROFILE_URL}theneedledrop`}>theneedledrop</a>, <a target="_blank" rel="noopener noreferrer" href={`${USER_PROFILE_URL}rj`}>rj</a>, <a target="_blank" rel="noopener noreferrer" href={`${USER_PROFILE_URL}xchuckbronsonx`}>xchuckbronsonx</a>, etc). </CardSubtitle>
                                    <CardText>Also select the timeframe in which you want to compare.</CardText>
                                    <div className="col-centered">
                                    <Form onSubmit={handleSubmit(this.onSubmit.bind(this))} inline>
                                        <Fields names={[ 'username_1', 'username_2', 'timeframe' ]} component={this.renderFields}/>
                                    </Form> 
                                    {error && <strong>{error}</strong>}
                                    </div>
                                </Card>
                            </CardDeck>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

function validate(values) {
    // value -> { title: 'asdf', categories: 'asdf', content: 'assadasd'}
    const errors = {};

    // Validate the inputs from "values"

    if (!values.username_1) {
        errors.username_1 = "Enter your username!"
    }
    if(!values.username_2) {
        errors.username_2 = "Enter your friend's username!"
    }

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
}

function mapStateToProps(state) {
    return {
        usernameValidation: state.usernameValidation
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ verifyUsernameValid }, dispatch);
} 

export default reduxForm({
    validate,
    form: 'LastFMChainIndexForm'
})(
    connect(mapStateToProps, mapDispatchToProps)(LastFMChainIndex)
);