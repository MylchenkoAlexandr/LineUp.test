import React, {Component} from "react";
import Logger from "../../../C/common/Logger";
import Notification from "../../../C/common/Notification";
import {Button, Input} from 'antd';
import Title from '../Title';
import {isEmpty} from 'lodash';
import PropTypes from "prop-types";

export default class Authentication extends Component {
    static fields = {
        USERNAME: "username",
        PASSWORD: "password"
    }
    static defaultProps = {
        disabled: false
    }
    static propTypes = {
        onSignIn: PropTypes.func,
        disabled: PropTypes.bool
    }

    state = {
        username: null,
        password: null
    }
    constructor(props) {
        super(props);
        /* debug */ Logger.info(Authentication.name, null, this);
    }
    render() {
        const {disabled} = this.props;
        return (
            <div className="Authentication">
                <div className="wrapper">
                    <Title text="AUTHENTICATION"/>
                    <Input disabled={disabled} key={Authentication.fields.USERNAME} placeholder="E-Mail:" onChange={this.events.onFieldChange(Authentication.fields.USERNAME)}/>
                    <Input.Password disabled={disabled} key={Authentication.fields.PASSWORD} placeholder="Password:" onChange={this.events.onFieldChange(Authentication.fields.PASSWORD)}/>
                    <Button disabled={disabled} type="primary" onClick={this.events.onSignIn}>Sign In</Button>
                </div>
            </div>
        )
    }
    events = {
        onFieldChange: (id) => ({target: {value}}) => {
            this.setState({[id]: value});
        },
        onSignIn: () => {
            const {username = null, password = null} = this.state;
            const {onSignIn} = this.props;

            if (isEmpty(username) && isEmpty(password)) {
                return Notification({
                    title: "Authentication",
                    message: "All fields must be entered",
                    className: "warning"
                });
            }
            if (isEmpty(username)) {
                return Notification({
                    title: "Authentication",
                    message: "E-Mail field cannot be empty",
                    className: "warning"
                });
            }
            if (isEmpty(password)) {
                return Notification({
                    title: "Authentication",
                    message: "Password field cannot be empty",
                    className: "warning"
                });
            }

            onSignIn && onSignIn({username, password});
        }
    }
}
