import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";
import Reducers from './reducers';

export const factory = ( initialState ) => createStore(
	Reducers,
	initialState,
	composeWithDevTools( applyMiddleware( thunk ) )
);;
