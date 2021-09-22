import EndPointControllerBase from "../../base/EndPointControllerBase";
import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import { EndPointType } from "../../constants";
import { logger } from "../../helpers";

class EndPointRootController extends EndPointControllerBase {
    constructor() {
        super();
        /* debug */ logger( "EndPointRootController", this ) ;
    }
    public handler = ( req: Request, res: Response):void => {
        try {
            /* debug */ logger( `${ this.type.toUpperCase() } ${ req.originalUrl }` ) ;
            res.status( HttpStatusCodes.OK ).send( "All right, this is a root" );

            return ;

        } catch ({ message }) {
            /* debug */ logger( `${ this.type.toUpperCase() } ${ this.path } [ error ]`, message ) ;
            res.status( HttpStatusCodes.FORBIDDEN ).json({ error:{ message } }) ;

            return ;
        }
    }
}

const instance = new EndPointRootController() ;
instance.create({
    type: EndPointType.GET,
    path: '/'
}) ;

export default instance ;