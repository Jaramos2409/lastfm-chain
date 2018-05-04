import React, { Component } from 'react';
import { Jumbotron, Button, Col, Row } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchArtistSimilar } from '../actions';


class LastFMChainIndex extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <input 
                    className="form-control"
                    type="text"
                    placeholder={field.placeholder}
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        // this.props.createPost(values, () => {
        //     this.props.history.push("/");
        // });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
        <div> 
            <Jumbotron fluid>
                <div className="text-center">
                    <h1 className="display-3">Connect artists through similar artists!</h1>
                    <p className="lead">Select two artists and see how far their connection is based on Last.fm's similar artists functionality!</p>
                    <hr className="my-2" />
                    <p>Input two artist names to see their connection.</p>
                    <p className="lead">
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Col sm="12" md={{ size: 4, offset: 4 }}>
                                <Field 
                                    placeholder="Artist 1"
                                    name="artist_1"
                                    component={this.renderField}
                                />
                                <Field 
                                    placeholder="Artist 2"
                                    name="artist_2"
                                    component={this.renderField}
                                />
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </Col>
                        </form>
                    </p>
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
})(
    connect(null,{ fetchArtistSimilar })(LastFMChainIndex)
);