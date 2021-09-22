import EndPointControllerBase from "../../base/EndPointControllerBase";
import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import { EndPointType } from "../../constants";
import { logger } from "../../helpers";

class EndPointThrownedController extends EndPointControllerBase {
    constructor() {
        super();
        /* debug */ logger( "EndPointRootController", this ) ;
    }
    public handler = ( req: Request, res: Response):void => {
        try {
            throw new Error( "Ok, cowboy, do you see the error message?" );

        } catch ({ message }) {
            /* debug */ logger( `${ this.type.toUpperCase() } ${ this.path } [ error ]`, message ) ;
            res.status( HttpStatusCodes.FORBIDDEN ).json({ error:{ message } }) ;
        }
    }
}

const instance = new EndPointThrownedController() ;
instance.create({
    type: EndPointType.GET,
    path: '/throwned'
}) ;

export default instance ;