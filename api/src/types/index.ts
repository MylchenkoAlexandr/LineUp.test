import { EndPointType } from "../constants";
import { Request, Response } from "express";
import { EndPointController_I } from "../interfaces"

export type CustomException = Error | string | any ;

export type DatabaseOptionsType = {
    url: string ;
    callback?: ( exception?: CustomException ) => void ;
}
export type ServerOptionsType = {
    port: number ;
    host: string ;
    callback?: ( exception?: CustomException ) => void ;
}
export type EndPointRequirements = {
    type: EndPointType;
    path: string;
}
export type EndPointHandler = ( req: Request, res: Response, next?:Function ) => void ;
export type EndPoints = EndPointController_I[] ;
