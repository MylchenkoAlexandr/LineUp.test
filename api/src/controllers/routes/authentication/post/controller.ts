import EndPointControllerBase from "../../../../base/EndPointControllerBase";
import HttpStatusCodes from "http-status-codes";
import {Request, Response} from "express";
import {createHash, logger, parseDtoError, createSessionJWTToken} from "../../../../helpers";
import dto from "../../registration/post/dto";
import UserModel from "../../../../models/database/user.model";
import validate from "validate.js";
import Config from "../../../../core/config";
import {get} from "lodash";
import {TResponseSuccess, TResponseFailed} from "../../../../types";

export default class Controller extends EndPointControllerBase {
    public handler = async (req: Request, res: Response): Promise<void> => {
        try {
            this.validate( req.body ) ;
            const { username, password } = req.body ;
            const _username = username.toLowerCase() ;
            const user = await this.isUserExists( _username, password ) ;
            const token:string = this.createAccessToken( user ) ;
            const data:TResponseSuccess = {
                status: true,
                payload: { token }
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
    private isUserExists = async ( username, password ):Promise<object> => {
        const { secret } = Config.singleton().config ;
        const hash = createHash( `${ username }${ password }`, secret )
        const user = await UserModel.findOne({ username, hash }) ;

        if( ! user ) throw new Error("User is not exists") ;

        return user;
    }
    private createAccessToken = ( user:object ):string => {
        const { secret, sessionTimeout: expiresIn } = Config.singleton().config ;
        const id:string = get( user, "id", null );
        if( !id ) throw new Error("Wrong user metadata")
        const accessToken:string = createSessionJWTToken({id}, secret, { expiresIn });

        return accessToken ;
    }
}
