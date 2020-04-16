import React from "react";
import {connect} from 'react-redux';
import {saveURL} from '../actions/branded.action'
import {Redirect} from "react-router";
import constants from "../constants";


class brandedShorten extends React.Component {
    constructor(props) {
        super(props);
        this.state = {url: '', brand: ''};
    }

    // validate(myURL) {
    //     var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    //         '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    //         '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
    //         '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
    //         '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
    //         '(\\#[-a-z\\d_]*)?$','i');
    //     return pattern.test(myURL);
    // }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleSubmit(event) {
        if (this.state.url === '' || this.state.brand === '') {
            alert('url and brand cannot be empty')
        } else if (!constants.validate(this.state.url)) {
            alert('the input url is not valid')
        } else {
            this.props.saveURL(this.state);
            event.preventDefault();
        }
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
                    <label>
                        brand:
                        <input type="text"
                               disabled={this.props.inFlight}
                               value={this.state.brand}
                               onChange={(e) => this.handleChange(e, 'brand')}/> </label>
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
        return this.props.brandedShorten
    }

    renderShortedEdit() {
        return constants.brandedEdit.concat("{YOUR BRAND}");
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
)(brandedShorten)