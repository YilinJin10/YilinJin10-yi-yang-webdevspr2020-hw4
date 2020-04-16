import React from "react";
import {connect} from 'react-redux';
import {saveURL} from '../actions/branded.action'
import BrandedURL from "./branded.container"
import ShortenURL from "./shorten.container"
import {Container, Tabs, Tab, Sonnet} from "react-bootstrap";
import '../css/style.css';

import {Redirect} from "react-router";

class index extends React.Component {

    render() {

        return (
            <div>
                <Container>
                    <h1>
                        Shorten Your URL!
                    </h1>
                    <br/>
                    <Tabs defaultActiveKey="shorten" fill>
                        <Tab eventKey="shorten" title="Unbranded" size="lg">
                            <br/>
                            <ShortenURL />
                        </Tab>
                        <Tab eventKey="branded" title="Branded">
                            <br/>
                            <BrandedURL />
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        );
    }

    renderShortedURL() {
        console.log("in container")
        console.dir(this.props.brandedShorten);
        return this.props.brandedShorten
    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        saveURL: (url) => dispatch(saveURL(url))
    }
};


function mapStateToProps(state, props) {
    return {
        brandedShorten: state.branded.branded
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(index)