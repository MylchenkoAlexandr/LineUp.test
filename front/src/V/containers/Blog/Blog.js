import React, {Component} from "react";
import {logout} from "../../../C/common/Utils";
import Section from "../../components/Section";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {createPost, getPosts, removePost} from "../../../M/redux/actions/blog.actions";
import {Button, Spin} from 'antd';
import BlogShortPost from './BlogShortPost';
import Paginator from './Paginator';
import BlogCreatePost from './BlogCreatePost';
import {PlusCircleFilled} from '@ant-design/icons';

@connect(
    ({blog}) => ({store: {blog}}),
    (dispatch) => ({actions: bindActionCreators({getPosts, removePost, createPost}, dispatch)})
)
export default class Blog extends Component {
    static defaultProps = {}
    static propTypes = {}

    state = {
        hasCreatePostVisible: false
    }
    constructor(props) {
        super(props);
    }
    render() {
        const {store: {blog}, actions: {createPost}} = this.props;
        const {hasCreatePostVisible} = this.state;
        const {data, paginator, status, fetching} = blog;
        return (
            <div className="Blog">
                <BlogCreatePost visible={hasCreatePostVisible} onClose={this.events.onCreatePostModalTrigger} onCreate={createPost}/>
                <Section key="menu" className="menu" type={Section.types.HALF}>
                    <Button type="primary" disabled={!status || fetching} icon={<PlusCircleFilled/>} onClick={this.events.onCreatePostModalTrigger}>CREATE</Button>
                    <Button type="ghost" onClick={logout}>LOGOUT</Button>
                </Section>
                <Section key="content" className="content" type={Section.types.HALF}>
                    <Spin spinning={fetching}>
                        <BlogShortPost data={data || []} onShow={this.events.onShowPost} onRemove={this.events.onRemovePost}/>
                    </Spin>
                </Section>
                <Section key="paginator" className="paginator" type={Section.types.HALF}>
                    <Paginator {...paginator} onChange={this.events.onPaginator}/>
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
            const {history} = this.props;
            history.push(`/post/${id}`);
        },
        onRemovePost: (id) => {
            const {actions: {removePost}} = this.props;
            removePost(id);
        },
        onPaginator: (pageNo) => {
            const {actions: {getPosts}} = this.props;
            getPosts(pageNo);
        },
        onCreatePostModalTrigger: () => {
            const {hasCreatePostVisible} = this.state;
            this.setState({hasCreatePostVisible: !hasCreatePostVisible});
        }
    }
}
