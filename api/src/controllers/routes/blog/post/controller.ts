import EndPointControllerBase from "../../../../base/EndPointControllerBase";
import HttpStatusCodes from "http-status-codes";
import {Request, Response} from "express";
import {TBlogPostData, TResponseFailed, TResponseSuccess} from "../../../../types";
import BlogModel from "../../../../models/database/blog.model";
import dto from "./dto";
import {logger, parseDtoError} from "../../../../helpers";
import validate from "validate.js";
import {get} from "lodash";

export default class Controller extends EndPointControllerBase {
    public handler = async (req: Request, res: Response): Promise<void> => {
        try {
            this.validate( req.body ) ;
            const post: TBlogPostData = {
                title: get( req.body, "title", "" ),
                content: get( req.body, "content", "" ),
                dateCreated: Date.now()
            }
            const payload:object = await this.createPost( post );

            /* debug */ logger("Controller([ payload ])", payload ) ;

            const data: TResponseSuccess = {
                status: true,
                payload
            } ;
            res.status(HttpStatusCodes.OK).json( data );

        } catch ({message}) {
            const payload: TResponseFailed = {
                status: false,
                error: { message }
            }
            res.status(HttpStatusCodes.FORBIDDEN).json(payload);
        }
    }
    private validate = ( data: object ): boolean => {
        const error = validate( data, dto ) ;
        if( error ) throw new Error( parseDtoError( error ) ) ;
        return true ;
    }
    private createPost = async ( data: TBlogPostData ):Promise<object> => {
        const model = new BlogModel(data);
        const post = await model.save();
        /* debug */ logger("Controller.createPost([ post ])", post ) ;
        return post.toObject() ;
    }
}
