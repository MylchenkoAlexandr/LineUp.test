import React, {Component} from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";

export default class Section extends Component {
    static types = {
        WIDE: "wide",
        HALF: "half"
    }
    static defaultProps = {
        type: Section.types.WIDE
    }
    static propTypes = {
        type: PropTypes.oneOf([Section.types.WIDE, Section.types.HALF]),
        className: PropTypes.string
    }

    constructor(props) {
        super(props);
    }
    render() {
        const {children, type, className} = this.props;
        return (
            <div className={ClassNames("Section", className)} data-type={type}>
                <div className="wrapper">
                    {children}
                </div>
            </div>
        )
    }
}


