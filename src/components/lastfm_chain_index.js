import _ from 'lodash';
import React, { Component } from 'react';
import { Jumbotron, Col, Input, FormGroup } from 'reactstrap';
import { Field, reduxForm  } from 'redux-form';
import LastFMSharedArtists from './lastfm_shared_artists';


class LastFMChainIndex extends Component {
    renderTextInput(field) {
        const { meta: { touched, error } } = field;
        const className = `${touched && error ? 'has-danger' : ''}`;

        return (
            <FormGroup className={className}>
                <Input 
                    className="form-control"
                    type="text"
                    placeholder={field.placeholder}
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </FormGroup>
        );
    }

    selectChoiceIfFirst(choice) {
        
    }

    renderSelectInput(field) {
        const { meta: { touched, error } } = field;
        const className = `${touched && error ? 'has-danger' : ''}`;

        return (
            <FormGroup>
                <Input defaultValue="overall" type="select" className={className} {...field.input}>
                    {_.map(field.options, choice => {
                        return (
                            <option key={choice.title} value={choice.value}> 
                                {choice.title}
                            </option>
                        );
                    })}
                </Input>
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </FormGroup>
        );
    }

    onSubmit(values) {
        this.props.history.push(`/${values.username_1}/${values.username_2}/${values.timeframe}`);
    }

    render() {
        const { handleSubmit } = this.props;
        const timeframeOptions = [
            {
                title: 'Timeframe',
                value: 'timeframe',
            },
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

        const { similarArtists } = this.props;

        return (
            <div> 
                <Jumbotron fluid>
                    <div className="text-center">
                        <h1 className="display-3">Compare yourself to your friend!</h1>
                        <p className="lead">See if you and your friend have been loving the same artists, albums, and tracks!</p>
                        <hr className="my-2" />
                        <p>Input the two usernames you wish to compare. Also select the timeframe in which you want to compare.</p>
                        {/* <p className="lead"> */}
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Col sm="12" md={{ size: 4, offset: 4 }}>
                                <Field 
                                    placeholder="Username 1"
                                    name="username_1"
                                    component={this.renderTextInput}
                                />
                                <Field 
                                    placeholder="Username 2"
                                    name="username_2"
                                    component={this.renderTextInput}
                                />
                                <Field 
                                    placeholder="Timeframe" 
                                    name="timeframe"
                                    options={timeframeOptions} 
                                    component={this.renderSelectInput} />
                                <button type="submit" className="btn btn-primary float-right">Submit</button>
                            </Col>
                        </form>
                    </div>
                    <div>
                        <LastFMSharedArtists similarArtists={similarArtists}/>
                    </div>
              </Jumbotron>
            </div>
        );
    }
}

function validate(values) {
    // value -> { title: 'asdf', categories: 'asdf', content: 'assadasd'}
    const errors = {};

    // Validate the inputs from "values"

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'LastFMChainIndexForm'
})(LastFMChainIndex);