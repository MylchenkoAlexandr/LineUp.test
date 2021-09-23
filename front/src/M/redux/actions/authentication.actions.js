import request from "../../../C/request";
import {get} from "lodash";

export const ActionTypes = {
    AUTHENTICATION_LOADING: 'authentication.loading',
    AUTHENTICATION_GET: 'authentication.get',
    AUTHENTICATION_ERROR: 'authentication.error',
}

export const authenticator = ({username, password}) => async (dispatch) => {
    try {
        dispatch({type: ActionTypes.AUTHENTICATION_LOADING});

        const {data} = await request.post("/authentication", {username, password});
        const token = get(data, "payload.token", null);

        dispatch({type: ActionTypes.AUTHENTICATION_GET, data: {token}});

    } catch ({message}) {
        dispatch({type: ActionTypes.AUTHENTICATION_ERROR});
    }
}
