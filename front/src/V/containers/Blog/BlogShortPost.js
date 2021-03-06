import React, {Component} from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {Button} from 'antd';

export default class BlogShortPost extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                title: PropTypes.string,
                content: PropTypes.string,
                dateCreated: PropTypes.number,
                removed: PropTypes.bool
            })
        ),
        onShow: PropTypes.func,
        onRemove: PropTypes.func
    }

    constructor(props) {
        super(props);
    }
    render() {
        const {data} = this.props;
        return this.ui.items(data);
    }

    events = {
        onShow: (id) => () => {
            const {onShow} = this.props;
            onShow && onShow(id);
        },
        onRemove: (id) => () => {
            const {onRemove} = this.props;
            onRemove && onRemove(id);
        }
    }
    ui = {
        items: (data) => {
            return data.map(({_id, title, content, removed = false, dateCreated}) => {
                return (
                    <div key={_id} className="BlogShortPost" data-removed={removed}>
                        <div className="wrapper">
                            <div key="header" className="header">
                                <div key="dateCreated" className="dateCreated">{moment(+dateCreated).fromNow()}</div>
                                <div key="title" className="title">{title}</div>
                            </div>
                            <div key="content" className="content">
                                {content}
                            </div>
                            <div key="actions" className="actions">
                                <Button type="primary" disabled={removed} onClick={this.events.onShow(_id)}>SHOW</Button>
                                <Button type="primary" disabled={removed} danger onClick={this.events.onRemove(_id)}>REMOVE</Button>
                            </div>
                        </div>
                    </div>
                )
            });
        }
    }
}
