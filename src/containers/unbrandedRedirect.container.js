import React from "react";
import {connect} from 'react-redux';
import {getURL} from '../actions/shorten.action';
import {Redirect} from "react-router";
import constants from "../constants";

class unbrandedRedirect extends React.Component {
    constructor(props) {
        super(props);
        const prefixLength = "/unbranded/".length
        const key = this.props.location.pathname.substring(prefixLength, this.props.location.pathname.length);
        console.log(this.props.location.pathname.substring(9, this.props.location.pathname.length));
        this.state = {hash: key, url:''};
    }

    render() {
        //const query = new URLSearchParams(this.props.location.search);
        //const query = this.props.match.params.brand
        //const token = query.get('brand');
        //const prefixLength = "/unbranded/".length
        //const key = this.props.location.pathname.substring(prefixLength, this.props.location.pathname.length);
        //console.log(this.props.location.pathname.substring(9, this.props.location.pathname.length));
        //this.setState({brand: key});
        //console.log("window location" + window.location);
        this.renderURL();
        return (
            <div>
                <h1>redirecting to ↓</h1>
                {/*<h2>{this.renderURL()}</h2>*/}
                <h2>{this.receiveURL()}</h2>

            </div>
        );
    }

    // componentDidMount() {
    //     window.location.replace(this.props.brandedShorten);
    // }

    renderURL() {
        this.props.getURL(this.state);
    }

    receiveURL() {
        // if (this.props.getURL === 'not found') {
        //     alert("invalid prams")
        //     //TODO: redirect to home
        // }
        // this.props.requestURL(this.state);
        // return this.props.shorten

        console.dir(this.props.shorten);
        //this.setState({url: this.props.brandedShorten})
        return this.props.shorten
    }

}


function mapDispatchToProps(dispatch, props) {
    return {
        getURL: (url) => dispatch(getURL(url))
    }
};


function mapStateToProps(state, props) {
    return {
        shorten: state.shorten.getURL
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(unbrandedRedirect)