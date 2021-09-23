import React, {Component} from "react";
import Logger from "../../../C/common/Logger";
import {TOKEN_STORE_KEY} from "../../../C/common/Constants";
import LocalStorage from "../../../C/common/LocalStorage";
import Authentication from "../../components/Authentication";
import Blog from "../Blog";
import BlogPost from "../BlogPost";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {authenticator} from "../../../M/redux/actions/authentication.actions";
import {Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from 'history'

const history = createBrowserHistory();

@connect(
    ({ authentication }) => ({ store:{ authentication } }),
    ( dispatch ) => ({ actions: bindActionCreators({ authenticator }, dispatch ) })
)
export default class Application extends Component {
    constructor( props ) {
        super( props );
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
            return (
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={Blog} />
                        <Route path="/post/:id" component={BlogPost}  />
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
            authenticator({ username, password }) ;
        }
    }
}


