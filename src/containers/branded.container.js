import React from "react";
import {connect} from 'react-redux';
import {saveURL} from '../actions/branded.action'
import {Redirect} from "react-router";

class brandedShorten extends React.Component {
    constructor(props) {
        super(props);
        this.state = {url: '', brand: ''};
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
            </div>
        );
    }

    renderShortedURL() {
        // console.log("in container")
        // console.dir(this.props.brandedShorten);
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
)(brandedShorten)