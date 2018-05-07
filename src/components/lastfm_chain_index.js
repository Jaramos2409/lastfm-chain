import _ from 'lodash';
import React, { Component } from 'react';
import { Col, Input, FormGroup, Form, Row, Card } from 'reactstrap';
import { Field, reduxForm  } from 'redux-form';


class LastFMChainIndex extends Component {
    renderTextInput(field) {
        const { meta: { touched, error } } = field;
        const className = `mb-2 mr-sm-2 mb-sm-0 ${touched && error ? 'has-danger' : ''}`;

        return (
            <FormGroup  className={className}>
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

    renderSelectInput(field) {
        const { meta: { touched, error } } = field;
        const className = `mb-2 mr-sm-2 mb-sm-0 ${touched && error ? 'has-danger' : ''}`;

        return (
            <FormGroup>
                <Input name={`dropdown_${field.label}`} value="overall" type="select" className={className} {...field.input}>
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
        console.log(values);
        this.props.history.push(`/${values.username_1}/${values.username_2}/${!values.timeframe ? 'overall' : values.timeframe}`);
    }

    render() {
        const { handleSubmit } = this.props;
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
            <div className="text-center main">
                    <Row>
                        <div className="col-centered">
                            <Col>
                                <Card className="card-background-section" body>
                                    <p>Input the two usernames you wish to compare. Also select the timeframe in which you want to compare.</p>
                                    <Form onSubmit={handleSubmit(this.onSubmit.bind(this))} inline>
                                            <Field 
                                                placeholder="Your Last.fm Username"
                                                name="username_1"
                                                component={this.renderTextInput}
                                            />
                                            <Field 
                                                placeholder="Your Friend's Username"
                                                name="username_2"
                                                component={this.renderTextInput}
                                            />
                                            <Field 
                                                name="timeframe"
                                                options={timeframeOptions} 
                                                component={this.renderSelectInput} />
                                            <button type="submit" className="btn btn-primary float-right">Submit</button>
                                    </Form>
                                </Card>
                            </Col>
                        </div>
                    </Row>
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