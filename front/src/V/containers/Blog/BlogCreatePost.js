import React, {Component} from "react";
import {Input, Modal} from 'antd';
import PropTypes from "prop-types";

export default class BlogCreatePost extends Component {
    static initialState = {
        title: "",
        content: ""
    }
    static defaultProps = {
        visible: false
    }
    static propTypes = {
        visible: PropTypes.bool,
        onCreate: PropTypes.func,
        onClose: PropTypes.func
    }

    state = {...BlogCreatePost.initialState}
    constructor(props) {
        super(props);
    }
    render() {
        const {visible} = this.props;
        const {title, content} = this.state;
        return (
            <Modal className="BlogCreatePost" title="Create record" visible={visible} onOk={this.events.onCreate} onCancel={this.events.onClose}>
                <Input className="title" value={title} onChange={this.events.onChange("title")}/>
                <Input.TextArea className="content" rows={10} value={content} onChange={this.events.onChange("content")}/>
            </Modal>
        )
    }
    events = {
        onChange: (id) => ({target: {value}}) => {
            this.setState({[id]: value});
        },
        onClose: () => {
            const {onClose} = this.props;
            this.setState({...BlogCreatePost.initialState}, onClose);
        },
        onCreate: () => {
            const {onCreate} = this.props;
            onCreate(this.state, this.events.onClose);
        }
    }
}
