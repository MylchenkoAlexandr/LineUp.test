import React, {Component} from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";

export default class Title extends Component {
    static size = {
        SMALL: "small",
        MIDDLE: "middle",
        LARGE: "large",
    }
    static defaultProps = {
        size: Title.size.SMALL
    }
    static propTypes = {
        size: PropTypes.oneOf([
            Title.size.SMALL,
            Title.size.MIDDLE,
            Title.size.LARGE
        ]).isRequired,
        className: PropTypes.string,
        text: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
            PropTypes.node
        ])
    }

    constructor(props) {
        super(props);
    }
    render() {
        const {text, size, className: _class} = this.props;
        const className = ClassNames("Title", size, _class);
        return (
            <div className={className}>
                {text}
            </div>
        )
    }
}
