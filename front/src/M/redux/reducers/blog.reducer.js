import {ActionTypes} from "../actions/blog.actions"
import model from "../model/blog.model";
import Logger from "../../../C/common/Logger";

export default ( state={ ... model }, action ) => {
	const { type, data } = action ;
	if( type ) switch ( type ) {
		case ActionTypes.BLOG_LOADING: {
			return { ... state, fetching: true, status: false } ;
		}
		case ActionTypes.BLOG_GET: {
			return { ... state, ...data, fetching: false, status: true } ;
		}
		case ActionTypes.BLOG_ERROR: {
			return { ... state, fetching: false, status: false } ;
		}
		default: return state ;
	}
}
