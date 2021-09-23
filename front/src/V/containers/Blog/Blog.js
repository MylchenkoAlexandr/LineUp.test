import React, {Component} from "react";
import Logger from "../../../C/common/Logger";
import Section from "../../components/Section";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getPosts} from "../../../M/redux/actions/blog.actions";

@connect(
    ({ blog }) => ({ store:{ blog } }),
    ( dispatch ) => ({ actions: bindActionCreators({ getPosts }, dispatch ) })
)
export default class Blog extends Component {
    static defaultProps = {}
    static propTypes = {}

    constructor( props ) {
        super( props );
        /* debug */ Logger.info( Blog.name, null, this ) ;
    }
    render() {
        return (
            <div className="Blog">
                <Section key="menu" className="menu" type={ Section.types.HALF }>
                    menu
                </Section>
                <Section key="content" className="content" type={ Section.types.HALF }>
                    content
                </Section>
                <Section key="paginator" className="paginator" type={ Section.types.HALF }>
                    paginator
                </Section>
            </div>
        )
    }
    componentDidMount() {
        const { actions:{ getPosts }, store:{ blog:{ fetching, status } } } = this.props ;
        const hasLoaded = ! fetching && status ;
        if( ! hasLoaded ) getPosts() ;
    }
}
