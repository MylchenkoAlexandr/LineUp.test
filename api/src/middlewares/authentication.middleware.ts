import {Request, Response, NextFunction} from "express";
import {logger} from "../helpers";
import {get,set} from "lodash";
import {RequestMethodTypes} from "../constants";
import {TResponseFailed} from "../types";
import HttpStatusCodes from "http-status-codes";
import Config from "../core/config";
import jwt from "jsonwebtoken";

const AuthenticationMiddleware = (req: Request, res: Response, next: NextFunction):void => {
    const { method } = req ;
    if( method === RequestMethodTypes.OPTIONS ) return next() ;

    try {
        let token ;
        token = get( req, "headers.authorization", null ) ;
        if(!token) throw new Error("Access denied");
        [ , token ] = token.split(" ") ;

        const { secret } = Config.singleton().config ;
        const validate = jwt.verify( token, secret ) ;
        const id:string = get( validate, "id", null );

        if( ! id && validate ) throw new Error( validate ) ;
        else set( req, "user.id", id ) ;

        return next() ;

    } catch ({ message }) {
        const payload: TResponseFailed = {
            success: false,
            error: { message }
        }
        res.status(HttpStatusCodes.UNAUTHORIZED).json(payload);

        return ;
    }
}

export default AuthenticationMiddleware ;
