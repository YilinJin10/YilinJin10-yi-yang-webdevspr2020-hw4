import React from "react";
import {connect} from 'react-redux';
import {saveURL} from '../actions/shorten.action'
import {Redirect} from "react-router";
import constants from "../constants";

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
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    {error}
                    <label>
                        url:
                        <input type="text"
                               disabled={this.props.inFlight}
                               value={this.state.url}
                               onChange={(e) => this.handleChange(e, 'url')}/> </label>
                    <input type="submit" value="Submit" disabled={this.props.inFlight}/>
                </form>
                <h4>shortened url is:</h4>
                <div>{this.renderShortedURL()}</div>
                <h4>to edit an url, please go to:</h4>
                <div>{this.renderShortedEdit()}</div>
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