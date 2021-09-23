import {ActionTypes} from "../actions/authentication.actions"
import model from "../model/authentication.model";
import LocalStorage from "../../../C/common/LocalStorage";
import {TOKEN_STORE_KEY} from "../../../C/common/Constants";

export default ( state={ ... model }, action ) => {
	const { type, data } = action ;
	if( type ) switch ( type ) {
		case ActionTypes.AUTHENTICATION_LOADING: {
			return { ... state, fetching: true, status: false } ;
		}
		case ActionTypes.AUTHENTICATION_GET: {
			const { token } = data ;
			const store = LocalStorage(TOKEN_STORE_KEY);
			store.setState(token);
			return { ... state, fetching: false, status: true } ;
		}
		case ActionTypes.AUTHENTICATION_ERROR: {
			return { ... state, fetching: false, status: false } ;
		}
		default: return state ;
	}
}
