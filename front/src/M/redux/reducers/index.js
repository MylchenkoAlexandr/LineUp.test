import {combineReducers} from "redux";
import authentication from "./authentication.reducer";
import blog from "./blog.reducer";

const reducers = {
    authentication,
    blog
} ;

export default combineReducers( reducers );
