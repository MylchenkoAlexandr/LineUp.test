import React, {Component} from "react";
import Logger from "../../../C/common/Logger";
import {TOKEN_STORE_KEY} from "../../../C/common/Constants";
import LocalStorage from "../../../C/common/LocalStorage";
import Authentication from "../../components/Authentication";
import Blog from "../Blog";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {authenticator} from "../../../M/redux/actions/authentication.actions";
import { Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import {createBrowserHistory} from 'history'

@connect(
    ({ authentication }) => ({ store:{ authentication } }),
    ( dispatch ) => ({ actions: bindActionCreators({ authenticator }, dispatch ) })
)
export default class Application extends Component {
    constructor( props ) {
        super( props );
        /* debug */ Logger.info( Application.name, null, this ) ;
    }
    render() {
        const token = this.controller.getSessionToken() ;
        return (
            <div className="Application">
                {
                    ! token
                    ? this.ui.authentication()
                    : this.ui.router()
                }
            </div>
        )
    }

    ui={
        authentication: () => {
            const { store:{ authentication:{ fetching } } } = this.props ;
            return (
                <Authentication onSignIn={ this.events.onSignIn } disabled={ fetching } />
            )
        },
        router: () => {
            const history = createBrowserHistory()
            return (
                <Router history={history}>
                    <Switch>
                        <Route path='/' component={Blog} />
                    </Switch>
                </Router>
            )
        }
    }
    controller = {
        getSessionToken: () => {
            const store = LocalStorage( TOKEN_STORE_KEY ) ;
            return store.getState() ;
        }
    }
    events = {
        onSignIn: ({ username, password }) => {
            const { actions:{ authenticator } } = this.props ;
            /* debug */ Logger.info( Application.name, "events.onSignIn([ username, password ])", username, password ) ;
            authenticator({ username, password }) ;
        }
    }
}


