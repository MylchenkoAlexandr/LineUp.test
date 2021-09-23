import EndPointControllerBase from "../../../../base/EndPointControllerBase";
import HttpStatusCodes from "http-status-codes";
import {Request, Response} from "express";
import {createHash, parseDtoError} from "../../../../helpers";
import validate from "validate.js";
import Config from "../../../../core/config";
import dto from "./dto";
import UserModel from "../../../../models/database/user.model";
import {TResponseSuccess, TResponseFailed,TUserData} from "../../../../types";

export default class Registration extends EndPointControllerBase {
    public handler = async (req: Request, res: Response):Promise<void> => {
        try {
            this.validate( req.body ) ;

            const { username, password } = req.body ;
            const _username = username.toLowerCase() ;

            await this.isUserExists( _username ) ;

            const user: TUserData = {
                username: _username,
                password
            }
            await this.createUser( user ) ;

            const payload:TResponseSuccess = {
                status: true,
                payload: null
            }
            res.status(HttpStatusCodes.CREATED).json(payload);

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
    private isUserExists = async ( username ):Promise<boolean> => {
        const user = await UserModel.findOne({ username }) ;
        if( user ) throw new Error("User is exists") ;
        return Promise.resolve(true);
    }
    private createUser = async ( data:TUserData ):Promise<void> => {
        const { secret } = Config.singleton().config ;
        const hash = createHash( `${ data.username }${ data.password }`, secret )
        const user = new UserModel({ username: data.username, hash });
        await user.save();
    }
}
