import React from "react";
import {connect} from 'react-redux';
import {saveURL, clear} from '../actions/shorten.action'
import {Redirect} from "react-router";

class shortenURL extends React.Component {
    constructor(props) {
        super(props);
        this.state = {url: '', shortened: ''};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        this.props.saveURL(this.state);
        event.preventDefault();
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
            </div>
        );
    }

    renderShortedURL() {

    }
}


function mapDispatchToProps(dispatch, props) {
    return {
        shortenURL: (url) => dispatch(shortenURL(url)),
        clear: () => dispatch(clear()),
    }
};


function mapStateToProps(state, props) {
    return {
        ...state.url,
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(shortenURL)