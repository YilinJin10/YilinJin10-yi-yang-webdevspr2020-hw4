import React from "react";
import {connect} from 'react-redux';
import {saveURL} from '../actions/shorten.action'
import {Redirect} from "react-router";
import constants from "../constants";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Container} from "react-bootstrap";

class shortenURL extends React.Component {
    constructor(props) {
        super(props);
        this.state = {url: '', shortened: ''};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        if (this.state.url === '') {
            alert('url and cannot be empty')
        } else if (!constants.validate(this.state.url)) {
            alert('the input url is not valid')
        } else {
            this.props.saveURL(this.state);
            event.preventDefault();
        }
    }

    render() {
        if (this.props.redirect) {
            return (<Redirect to={this.props.redirect}/>)
        }

        let error;
        if (this.props.error) {
            error = (<h3>{this.props.error}</h3>)
        }

        return (
            <div>
                <Container>
                    <Row>
                        <Col lg={3} sm={0}></Col>
                        <Col lg={6} sm={12}>
                            <Form>
                                <Form.Group>
                                    <Form.Label>URL:</Form.Label>
                                    <Form.Control disabled={this.props.inFlight}
                                                  value={this.state.url}
                                                  onChange={(e) => this.handleChange(e, 'url')} />
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col lg={3} sm={0}></Col>
                    </Row>
                    <Row>

                        <Col lg={3} sm={0}></Col>
                        <Col lg={6} sm={12}>
                            <p>*To edit an submitted url, please go to:
                                <span> {this.renderShortedEdit()}</span>
                            </p>
                        </Col>
                        <Col lg={3} sm={0}></Col>
                    </Row>
                    <Row>
                        <Col lg={3} sm={0}></Col>
                        <Col lg={6} sm={12}>
                            <Button
                                variant="primary" size="md"
                                title="Submit"
                                onClick={(e) => this.handleSubmit(e)}
                            >Submit</Button>
                        </Col>
                        <Col lg={3} sm={0}></Col>
                    </Row>
                </Container>
                <div className="text">
                    <h4>Shortened url with hash:</h4>
                    <h5>{this.renderShortedURL()}</h5>
                </div>
            </div>
        );
    }

    renderShortedURL() {
        return this.props.shortenURL
    }

    renderShortedEdit() {
        return constants.unbrandedEdit.concat("{YOUR HASH}")
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        saveURL: (url) => dispatch(saveURL(url))
    }
};


function mapStateToProps(state, props) {
    return {
        shortenURL: state.shorten.shortened
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(shortenURL)