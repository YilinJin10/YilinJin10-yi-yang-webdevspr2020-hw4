import React from "react";
import {connect} from 'react-redux';
import {getURL} from '../actions/branded.action';
import {Redirect} from "react-router";

class brandedRedirect extends React.Component {
    constructor(props) {
        super(props);
        const prefixLength = "/branded/".length
        const key = this.props.location.pathname.substring(prefixLength, this.props.location.pathname.length);
        console.log(this.props.location.pathname.substring(9, this.props.location.pathname.length));
        this.state = {brand: key, url:''};
    }

    render() {
        //const query = new URLSearchParams(this.props.location.search);
        //const query = this.props.match.params.brand
        //const token = query.get('brand');
        const prefixLength = "/branded/".length
        const key = this.props.location.pathname.substring(prefixLength, this.props.location.pathname.length);
        console.log(this.props.location.pathname.substring(9, this.props.location.pathname.length));
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

    componentDidMount() {
        this.receiveURL();
        console.log(this.state.url)
        window.location.replace(this.state.url);
    }

    renderURL() {
        this.props.getURL(this.state);
    }

    // receiveURL() {
    //     console.dir(this.props.brandedShorten);
    //     //this.setState({url: this.props.brandedShorten})
    //     return this.props.brandedShorten
    // }

    receiveURL() {
        // if (this.renderURL === 'not found') {
        //     alert("invalid prams")
        //     //TODO: redirect to home
        // }
        // //this.props.requestURL(this.state);
        // return this.props.brandedShorten

        console.dir(this.props.shorten);
        this.setState({url: this.props.brandedShorten})
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
        brandedShorten: state.branded.getURL
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(brandedRedirect)