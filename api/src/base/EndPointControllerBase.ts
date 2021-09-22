import { EndPointController_I } from "../interfaces";
import { Request, Response } from "express";
import { EndPointType } from "../constants";
import { EndPointRequirements } from "../types";

export default class EndPointControllerBase implements EndPointController_I {

    private _type: EndPointType ;
    private _path: string ;

    public get type(): EndPointType {
        return this._type ;
    }
    public get path(): string {
        return this._path ;
    }

    public create( args: EndPointRequirements ) {
        this._type = args.type ;
        this._path = args.path ;

        return this ;
    }
    public handler = ( req: Request, res: Response ): void => {}
}