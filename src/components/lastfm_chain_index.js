import _ from 'lodash';
import React, { Component } from 'react';
import { Col, Input, FormGroup, Form, Row, Card, CardDeck, CardText, CardSubtitle, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { verifyUsernameValid } from '../actions';
import { Fields, reduxForm, SubmissionError } from 'redux-form';
import { USER_PROFILE_URL } from '../constants';
import { bindActionCreators } from 'redux';

class LastFMChainIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
          submitButtonText: 'Submit'
        }
    }

    onClickButton() {
        this.setState({
            submitButtonText: 'Loading'
        });
    }

    onSubmitFailed() {
        this.setState({
            submitButtonText: 'Submit'
        });
    }

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
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0 pb-2">
                    <Input 
                        className="form-control"
                        type="text"
                        placeholder="Your Last.fm Username"
                        {...fields.username_1.input}
                    />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0 pb-2">
                    <Input 
                        className="form-control"
                        type="text"
                        placeholder="Your Friend's Username"
                        {...fields.username_2.input}
                    />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0 pb-2">
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
                <Button type="submit">{fields.submitButtonName}</Button>
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
        this.onClickButton();

        return this.props.verifyUsernameValid(values).then(() => {
            const { isUserOneValid, isUserTwoValid } = this.props.usernameValidation;

            if (!isUserOneValid) {
                this.onSubmitFailed();
                throw new SubmissionError({
                    username_1: 'User one does not exist',
                    _error: 'Please use a valid Last.fm username!'
                })
            } 
            if (!isUserTwoValid) {
                this.onSubmitFailed();
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
                <div className="sharedArtistsColumns pb-5">
                    <Row>
                        <Col>
                            <CardDeck>
                                <Card className="mx-auto" style={{backgroundColor: '#323232', color: '#fff', maxWidth:"80%"}} body>
                                    <CardSubtitle>Input the two usernames you wish to compare (i.e. <a target="_blank" rel="noopener noreferrer" href={`${USER_PROFILE_URL}theneedledrop`}>theneedledrop</a>, <a target="_blank" rel="noopener noreferrer" href={`${USER_PROFILE_URL}rj`}>rj</a>, <a target="_blank" rel="noopener noreferrer" href={`${USER_PROFILE_URL}xchuckbronsonx`}>xchuckbronsonx</a>, etc). </CardSubtitle>
                                    <CardText>Also select the timeframe in which you want to compare.</CardText>
                                    <div className="col-centered">
                                    <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                        <Fields submitButtonName={this.state.submitButtonText} names={[ 'username_1', 'username_2', 'timeframe' ]} component={this.renderFields}/>
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
    const errors = {};

    if (!values.username_1) {
        errors.username_1 = "Enter your username!"
    }
    if(!values.username_2) {
        errors.username_2 = "Enter your friend's username!"
    }

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