import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducers from './reducers/shorten.reducer';
import thunkMiddleware from 'redux-thunk';
import {
    BrowserRouter, Switch,
    Route, Redirect, Link
} from "react-router-dom";
import UserLogin from "./containers/login.container";
import Pokemons from "./containers/pokemons.container";
import Register from "./containers/register.container";
import shortenURL from "./containers/shorten.container";

const userStore = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={userStore}>
        <BrowserRouter>
        {/*<Link to={'/login'}>Login</Link>&nbsp;*/}
        {/*<Link to={'/register'}>Register</Link>*/}
            <Switch>
                <Route path="/shorten" component={shortenURL}/>
                <Route path="/register" component={Register}/>
                <Route path="/user/:username/pokemon" component={Pokemons}/>
                <Redirect exact from="/" to="shorten"/>
            </Switch>
        </BrowserRouter>
    </Provider>,

    document.getElementById('root')
);