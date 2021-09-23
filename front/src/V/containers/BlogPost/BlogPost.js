import React, {Component} from "react";
import Logger from "../../../C/common/Logger";
import {Button} from 'antd';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {updatePost} from "../../../M/redux/actions/blog.actions";
import {find,isEmpty} from "lodash";
import Section from "../../components/Section";
import {EnterOutlined} from '@ant-design/icons';
import { Input, Spin } from 'antd';

@connect(
    ({blog}) => ({store: {blog}}),
    (dispatch) => ({actions: bindActionCreators({updatePost}, dispatch)})
)
export default class BlogPost extends Component {
    constructor( props ) {
        super( props );
    }
    render() {
        if( ! this.state ) return (
            <Spin spinning={ true }/>
        )
        const { history:{ goBack }, store:{ blog:{ fetching } } } = this.props ;
        const { title, content } = this.state ;
        return (
            <Section key="menu" className="BlogPost" type={Section.types.WIDE}>
                <Section key="menu" className="menu" type={Section.types.HALF}>
                    <Button type="primary" icon={ <EnterOutlined /> } onClick={ goBack }>BACK</Button>
                    <Button type="ghost" disabled={ fetching } loading={ fetching } onClick={ this.events.onSave }>SAVE</Button>
                </Section>
                <Section key="content" className="content" type={Section.types.HALF}>
                    <Input value={ title } onChange={ this.events.onChange("title") }/>
                    <Input.TextArea rows={ 10 } value={ content } onChange={ this.events.onChange("content") }/>
                </Section>
            </Section>
        )
    }
    componentDidMount() {
        if( isEmpty( this.state ) ) {
            const item = this.controller.getData() ;
            this.setState( item ) ;
        }
    }

    controller = {
        getData: () => {
            const { match:{ params:{ id: _id } }, store:{ blog:{ data } } } = this.props ;
            const post = find( data || [], { _id } );
            return post ;
        }
    }
    events = {
        onChange: ( id ) => ({ target:{ value } }) => {
            this.setState({[id]:value});
        },
        onSave: () => {
            const {actions:{updatePost}} = this.props ;
            updatePost(this.state);
        }
    }
}
