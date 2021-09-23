import React, {Component} from "react";
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
    }
    render() {
        const {total, page, onChange} = this.props;
        return (
            <Pagination current={page} total={total} onChange={onChange}/>
        )
    }
}
