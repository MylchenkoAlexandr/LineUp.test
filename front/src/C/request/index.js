import Axios from "axios";
import { has } from "lodash";
import {TOKEN_STORE_KEY, TOKEN_PREFIX} from "../../C/common/Constants";
import {logout} from "../../C/common/Utils";
import LocalStorage from "../../C/common/LocalStorage";
import Notification from "../../C/common/Notification";
import Logger from "../common/Logger";

const create = () => {
    const request = Axios.create({
        baseURL: process.env.HOST_API
    }) ;
    const store = LocalStorage( TOKEN_STORE_KEY );

    request.interceptors.request.use( config => {
        const token = store.getState() ;
        if( token ) { config.headers.Authorization = `${ TOKEN_PREFIX } ${ token }` }

        return config ;
    }) ;
    request.interceptors.response.use(
        ( response ) => {
            if( has( response, "data.error" ) ) {
                const error = response.data.error ;
                if( error ) {
                    if( error.message ) Notification({ title:"Error", message: error.message, className:"error" });
                    return { data: { data: null }, error } ;
                }
            }
            return response;
        },
        ( error ) => {

            if( error.response.status === 401 ) {
                setTimeout( logout, 2000 ) ;
            }
            if( has( error, "response.data.error" ) ) {
                const { message } = error.response.data.error ;
                Notification({ title:"Error", message, className:"error" });
            } else if( error.message ) {
                Notification({ title:"Error", message:error.message, className:"error" });
            }

            return Promise.reject( error );
        }
    );

    return request ;
}

export default create() ;
