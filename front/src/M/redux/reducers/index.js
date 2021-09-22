import {combineReducers} from "redux";
import authentication from "./authentication.reducer";

const reducers = {
    authentication
} ;

export default combineReducers( reducers );
