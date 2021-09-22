import React from "react";
import Application from "../Application";
import {Provider} from "react-redux";
import {factory} from "../../../M/redux";
import en_US from 'antd/lib/locale/en_US';
import {ConfigProvider} from "antd"

const Main = () => {
    return (
        <Provider store={ factory() }>
            <ConfigProvider locale={ en_US }>
                <Application />
            </ConfigProvider>
        </Provider>
    )
}

export default Main ;
