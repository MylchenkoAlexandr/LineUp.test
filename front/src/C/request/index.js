import Axios from "axios";
import { has } from "lodash";
import {TOKEN_STORE_KEY} from "../../C/common/Constants";
import LocalStorage from "../../C/common/LocalStorage";
import Notification from "../../C/common/Notification";

const create = () => {
    const request = Axios.create({
        baseURL: process.env.HOST_API
    }) ;
    request.interceptors.request.use( config => {
        const store = LocalStorage( TOKEN_STORE_KEY );
        const token = store.getState() ;

        if( token ) { config.headers.Authorization = token }

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
            if( has( error, "response.data.error" ) ) {
                const { message } = error.response.data.error ;
                Notification({ title:"Error", message, className:"error" });

            } else
                if( error.message ) {
                    Notification({ title:"Error", message:error.message, className:"error" });
                }

            return Promise.reject( error );
        }
    );

    return request ;
}

export default create() ;
