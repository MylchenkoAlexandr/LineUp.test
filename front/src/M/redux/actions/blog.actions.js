import request from "../../../C/request";
import Logger from "../../../C/common/Logger";
import Notification from "../../../C/common/Notification";

export const ActionTypes = {
    BLOG_LOADING: 'blog.loading',
    BLOG_GET: 'blog.get',
    BLOG_UPDATED: 'blog.updated',
    BLOG_REMOVED: 'blog.removed',
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
export const updatePost = ( { _id, title, content } ) => async ( dispatch ) => {
    try {
        dispatch({ type: ActionTypes.BLOG_LOADING } ) ;

        const { data } = await request.put("/blog", { _id, title, content }) ;
        const { payload } = data ;

        dispatch({ type: ActionTypes.BLOG_UPDATED, data: payload } ) ;

        Notification({title:"UPDATE", message:"Record updated!", className:"success"})

    } catch ({ message }) {
        dispatch({ type: ActionTypes.BLOG_ERROR } ) ;
    }
}
export const removePost = ( _id ) => async ( dispatch ) => {
    try {
        dispatch({ type: ActionTypes.BLOG_LOADING } ) ;

        const { data } = await request.delete(`/blog/${ _id }`) ;
        const { payload } = data ;

        dispatch({ type: ActionTypes.BLOG_REMOVED, data: payload } ) ;

        Notification({title:"UPDATE", message:"Record removed!", className:"success"})

    } catch ({ message }) {
        dispatch({ type: ActionTypes.BLOG_ERROR } ) ;
    }
}
