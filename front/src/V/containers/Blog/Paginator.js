import React, {Component} from "react";
import Logger from "../../../C/common/Logger";
import {Pagination} from 'antd';
import PropTypes from "prop-types";

export default class Paginator extends Component {
    static defaultProps = {}
    static propTypes = {
        total: PropTypes.number,
        page: PropTypes.number,
        limit: PropTypes.number,
        onChange: PropTypes.func
    }

    constructor(props) {
        super(props);
        /* debug */ Logger.info(Paginator.name, null, this);
    }
    render() {
        const {total, page, limit, onChange} = this.props;
        return (
            <Pagination current={page} total={total} onChange={ onChange }/>
        )
    }
}
