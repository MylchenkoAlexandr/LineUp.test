import {ActionTypes} from "../actions/blog.actions"
import model from "../model/blog.model";
import {deepClone} from "../../../C/common/Utils";
import {findIndex} from "lodash";

export default (state = {...model}, action) => {
    const {type, data} = action;
    if (type) switch (type) {
        case ActionTypes.BLOG_LOADING: {
            return {...state, fetching: true, status: false};
        }
        case ActionTypes.BLOG_GET: {
            return {...state, ...data, fetching: false, status: true};
        }
        case ActionTypes.BLOG_ERROR: {
            return {...state, fetching: false, status: false};
        }
        case ActionTypes.BLOG_CREATE: {
            const _data = deepClone(state.data);
            _data.unshift(data);
            return {...state, data: _data, fetching: false, status: true};
        }
        case ActionTypes.BLOG_UPDATED: {
            const _state = deepClone(state);
            const foundIndex = findIndex(_state.data, element => element._id === data._id)
            _state.data.splice(foundIndex, 1, data)

            return {..._state, fetching: false, status: true};
        }
        case ActionTypes.BLOG_REMOVED: {
            const _state = deepClone(state);
            const foundIndex = findIndex(_state.data, element => element._id === data._id)
            _state.data.splice(foundIndex, 1, {...data, removed: true})

            return {..._state, fetching: false, status: true};
        }
        default:
            return state;
    }
}
