import React, {Component} from "react";
import Logger from "../../../C/common/Logger";
import Section from "../../components/Section";

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
            </div>
        )
    }
}
