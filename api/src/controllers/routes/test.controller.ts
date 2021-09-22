import { Request, Response } from "express";
import EndPointControllerBase from "../../base/EndPointControllerBase";
import { EndPointType } from "../../constants";
import { logger } from "../../helpers";
import HttpStatusCodes from "http-status-codes";

class EndPointTestController extends EndPointControllerBase {
    constructor() {
        super();
        /* debug */ logger( "EndPointTestController", this ) ;
    }
    public handler = ( req: Request, res: Response):void => {
        try {
            /* debug */ logger( `${ this.type.toUpperCase() } ${ req.originalUrl }` ) ;
            res.status( HttpStatusCodes.OK ).send( "Welcome to the test" );

            return ;

        } catch ({ message }) {
            /* debug */ logger( `${ this.type.toUpperCase() } ${ this.path } [ error ]`, message ) ;
            res.status( HttpStatusCodes.FORBIDDEN ).json({ error:{ message } }) ;

            return ;
        }
    }
}

const instance = new EndPointTestController() ;
instance.create({
    type: EndPointType.GET,
    path: '/test'
}) ;

export default instance ;