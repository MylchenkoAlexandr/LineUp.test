import EndPointControllerBase from "../../../../base/EndPointControllerBase";
import HttpStatusCodes from "http-status-codes";
import {Request, Response} from "express";
import {TBlogPostData, TResponseFailed, TResponseSuccess} from "../../../../types";
import {logger, parseDtoError} from "../../../../helpers";
import dto from "./dto";
import {get} from "lodash";
import validate from "validate.js";
import BlogModel from "../../../../models/database/blog.model";

export default class Controller extends EndPointControllerBase {
    public handler = async (req: Request, res: Response): Promise<void> => {
        try {
            this.validate( req.params ) ;

            const id = get( req.params, "id" ) ;
            const payload:object = await this.removePost( id ) ;
            const data:TResponseSuccess = {
                status: true,
                payload
            } ;
            res.status(HttpStatusCodes.CREATED).json( data );

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
    private removePost = async ( _id:string ):Promise<object> => {
        /* debug */ logger( "removePost", _id );
        const post = await BlogModel.findOneAndDelete( { _id }, { new: true } ) ;
        return post as object ;
    }
}
