import request from "../../../C/request";
import Logger from "../../../C/common/Logger";

export const ActionTypes = {
    BLOG_LOADING: 'blog.loading',
    BLOG_GET: 'blog.get',
    BLOG_ERROR: 'blog.error',
}

export const getPosts = ( page = 1 ) => async ( dispatch ) => {
    try {
        dispatch({ type: ActionTypes.BLOG_LOADING } ) ;

        const { data } = await request.get(`/blog/${ page }`) ;
        const { payload } = data ;

        dispatch({ type: ActionTypes.BLOG_GET, data: payload } ) ;

    } catch ({ message }) {
        dispatch({ type: ActionTypes.BLOG_ERROR } ) ;
    }
}
