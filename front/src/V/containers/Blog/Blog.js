import React, {Component} from "react";
import Logger from "../../../C/common/Logger";
import Section from "../../components/Section";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getPosts} from "../../../M/redux/actions/blog.actions";
import {Spin} from 'antd';
import BlogShortPost from './BlogShortPost';

@connect(
    ({blog}) => ({store: {blog}}),
    (dispatch) => ({actions: bindActionCreators({getPosts}, dispatch)})
)
export default class Blog extends Component {
    static defaultProps = {}
    static propTypes = {}

    constructor(props) {
        super(props);
        /* debug */ Logger.info(Blog.name, null, this);
    }
    render() {
        const {store: {blog}} = this.props;
        const {data, paginator, status, fetching} = blog;
        return (
            <div className="Blog">
                <Section key="menu" className="menu" type={Section.types.HALF}>
                    menu
                </Section>
                <Section key="content" className="content" type={Section.types.HALF}>
                    {
                        ! status
                        ? <Spin spinning={fetching}/>
                        : <BlogShortPost data={data} onShow={this.events.onShowPost} onRemove={this.events.onRemovePost}/>
                    }
                </Section>
                <Section key="paginator" className="paginator" type={Section.types.HALF}>
                    paginator
                </Section>
            </div>
        )
    }
    componentDidMount() {
        const {actions: {getPosts}, store: {blog: {fetching, status}}} = this.props;
        const hasLoaded = !fetching && status;
        if (!hasLoaded) getPosts();
    }
    events = {
        onShowPost: (id) => {
            const { history } = this.props ;
            /* debug */ Logger.log(Blog.name, "events.onShowPost([id])", id);
            history.push(`/post/${id}`);
        },
        onRemovePost: (id) => {
            /* debug */ Logger.log(Blog.name, "events.onRemovePost([id])", id);
        }
    }
}
