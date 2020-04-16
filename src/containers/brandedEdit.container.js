import React from "react";
import {connect} from 'react-redux';
import {updateURL, deleteURL,getURL} from '../actions/branded.action'
import {Redirect} from "react-router";

class brandedEdit extends React.Component {
    constructor(props) {
        super(props);
        const prefixLength = "/edit/branded/".length;
        const url = this.props.location.pathname;
        const length = url.length;
        const key = url.substring(prefixLength, length);
        console.log(key);
        this.state = {url: '', brand: key};
    }

    handleChange(event, value) {
        this.setState({[value]: event.target.value || ''});
    }

    handleUpdate(event) {
        this.props.updateURL(this.state);
        event.preventDefault();
    }

    handleDelete() {
        this.props.deleteURL(this.state);
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
                <h4>current url: {this.getURLData()}</h4>
                <form onSubmit={(e) => this.handleUpdate(e)}>
                    {error}
                    <label>
                        edit url:
                        <input type="text"
                               disabled={this.props.inFlight}
                               value={this.state.url}
                               onChange={(e) => this.handleChange(e, 'url')}/> </label>
                    <input type="submit" value="Update" disabled={this.props.inFlight}/>
                </form>
                <form onSubmit={(e) => this.handleDelete()}>
                    {error}
                    <input type="submit" value="Delete" disabled={this.props.inFlight}/>
                </form>
            </div>
        );
    }

    getURLData() {
        this.props.requestURL(this.state);
        return this.props.getURL
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
        getURL: state.branded.getURL,
        getUDeleted: state.branded.getDeleted
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(brandedEdit)