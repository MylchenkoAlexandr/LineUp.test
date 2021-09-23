import React, {Component} from "react";
import Logger from "../../../C/common/Logger";
import PropTypes from "prop-types";
import moment from "moment";
import { Button } from 'antd';

export default class BlogShortPost extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                title: PropTypes.string,
                content: PropTypes.string,
                dateCreated: PropTypes.number
            })
        ),
        onShow: PropTypes.func,
        onRemove: PropTypes.func
    }

    constructor( props ) {
        super( props );
        /* debug */ Logger.info( BlogShortPost.name, null, this ) ;
    }
    render() {
        const { data } = this.props ;
        return this.ui.items( data ) ;
    }
    ui = {
        items:( data ) => {
            return data.map( ({ _id, title, content, dateCreated })=>{
                return (
                    <div key={ _id } className="BlogShortPost">
                        <div className="wrapper">
                            <div key="header" className="header">
                                <div key="dateCreated" className="dateCreated">{ moment( +dateCreated ).fromNow() }</div>
                                <div key="title" className="title">{ title }</div>

                            </div>
                            <div key="content" className="content">
                                { content }
                            </div>
                            <div key="actions" className="actions">
                                <Button type="primary" onClick={this.events.onShow(_id)}>SHOW</Button>
                                <Button type="primary" danger onClick={this.events.onRemove(_id)}>REMOVE</Button>
                            </div>
                        </div>
                    </div>
                )
            } );
        }
    }
    events = {
        onShow: ( id ) => () => {
            const { onShow } = this.props ;
            onShow && onShow( id );
        },
        onRemove: ( id ) => () => {
            const { onRemove } = this.props ;
            onRemove && onRemove( id ) ;
        }
    }
}
