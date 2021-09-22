import EndPointControllerBase from "../../../../base/EndPointControllerBase";
import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import { logger } from "../../../../helpers";

export default class Controller extends EndPointControllerBase {
    constructor() {
        super();
        /* debug */ logger( "AuthenticationPostController", this ) ;
    }
    public handler = ( req: Request, res: Response):void => {
        try {
            /* debug */ logger( `${ this.type.toUpperCase() } ${ req.originalUrl }` ) ;
            res.status( HttpStatusCodes.OK ).send( "All right, this is POST" );

            return ;

        } catch ({ message }) {
            /* debug */ logger( `${ this.type.toUpperCase() } ${ this.path } [ error ]`, message ) ;
            res.status( HttpStatusCodes.FORBIDDEN ).json({ error:{ message } }) ;

            return ;
        }
    }
}
