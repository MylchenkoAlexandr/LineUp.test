import {ActionTypes} from "../actions/authentication.actions"
import model from "../model/authentication.model";

export default ( state={ ... model }, action ) => {
	const { type } = action ;
	if( type ) switch ( type ) {
		case ActionTypes.AUTHENTICATION_LOADING: {
			return { ... state, fetching: true, status: false } ;
		}
		case ActionTypes.AUTHENTICATION_GET: {
			return { ... state, fetching: false, status: true } ;
		}
		case ActionTypes.AUTHENTICATION_ERROR: {
			return { ... state, fetching: false, status: false } ;
		}
		default: return state ;
	}
}
