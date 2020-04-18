import React from "react";
import {connect} from 'react-redux';
import {updateURL, deleteURL, getURL} from '../actions/shorten.action'
import {Redirect} from "react-router";
import constants from "../constants";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Container} from "react-bootstrap";

class unbrandedEdit extends React.Component {
    constructor(props) {
        super(props);
        const prefixLength = "/edit/unbranded/".length;
        const url = this.props.location.pathname;
        const length = url.length;
        const key = url.substring(prefixLength, length);
        console.log(key);
        this.state = {url: '', hash: key};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleUpdate(event) {
        if (this.state.url === '') {
            alert('url cannot be empty')
        } else if (!constants.validate(this.state.url)) {
            alert('the input url is not valid')
        } else {
            this.props.updateURL(this.state);
            event.preventDefault();
        }
    }

    handleDelete() {
        this.props.deleteURL(this.state);
        this.props.requestURL(this.state);
        if (this.props.receiveURL === null) {
            alert("Hashed URL deleted, will redirect to home page");
            return <Redirect to='/index'/>
        }
        event.preventDefault()
    }
    //
    // componentDidMount() {
    //     this.props.clear();
    //     this.setState({url: '', shortened: ''});
    // }

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
                <h1>Current url matching this hash: {this.getURLData()}</h1>

                <Container>
                    <Row>
                        <Col lg={3} sm={0}></Col>
                        <Col lg={6} sm={12}>
                            <Form>
                                <Form.Group>
                                    <Form.Label>EDIT URL:</Form.Label>
                                    <Form.Control disabled={this.checkBrand()}
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
                            <Button
                                variant="primary" size="md"
                                title="Submit"
                                type="submit" value="Update"
                                disabled={this.checkBrand() || this.props.inFlight}
                                onClick={(e) => this.handleUpdate(e)}
                            >Update</Button>

                            <Button
                                variant="danger" size="md"
                                title="Delete"
                                type="submit"
                                value="Delete"
                                disabled={this.checkBrand() || this.props.inFlight}
                                onClick={(e) => this.handleDelete(e)}
                            >Delete</Button>
                        </Col>
                        <Col lg={3} sm={0}></Col>
                    </Row>
                </Container>
            </div>
        );
    }

    getURLData() {
        this.props.requestURL(this.state);
        console.log(this.props.receiveURL.length === 0);
        if (this.props.receiveURL.length === 0) {
            alert("Invalid URL, will redirect to home page");
            return <Redirect to='/index'/>
        } else {
            return this.props.receiveURL
        }
    }

    checkBrand() {
        return constants.checkKeyExits(this.props.getURL)
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        updateURL: (url) => dispatch(updateURL(url)),
        deleteURL: (url) => dispatch(deleteURL(url)),
        requestURL: (url) => dispatch(getURL(url))
    }
};


function mapStateToProps(state, props) {
    return {
        receiveURL: state.shorten.getURL,
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(unbrandedEdit)