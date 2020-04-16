import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducers from './reducers/index';
import thunkMiddleware from 'redux-thunk';
import {
    BrowserRouter, Switch,
    Route, Redirect, Link
} from "react-router-dom";
import UserLogin from "./containers/login.container";
import Pokemons from "./containers/pokemons.container";
import Register from "./containers/register.container";
import shortenURL from "./containers/shorten.container";
import brandedURL from "./containers/branded.container";
import index from "./containers/index.container"
import 'bootstrap/dist/css/bootstrap.min.css';

const userStore = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={userStore}>
        <BrowserRouter>
        {/*<Link to={'/shorten'}>Login</Link>&nbsp;*/}
        {/*<Link to={'/brand'}>Register</Link>*/}
            <Switch>
                {/*<Route path="/:hash" c*/}
                <Route path="/shorten" component={shortenURL}/>
                <Route path="/index" component={index}/>
                <Route path="/brand" component={brandedURL}/>
                <Route path="/register" component={Register}/>
                <Route path="/user/:username/pokemon" component={Pokemons}/>
                <Redirect exact from="/" to="index"/>
            </Switch>
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
);