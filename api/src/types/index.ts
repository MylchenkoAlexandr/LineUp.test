import {EndPointType} from "../constants";
import {Request, Response} from "express";
import {IEndPointController} from "../interfaces"

export type TCustomException = Error | string | any;
export type TConfig = {
    env: string;
    databaseUrl: string;
    hostPort: number;
    host: string;
}
export type TDatabaseOptions = {
    url: string;
    callback?: (exception?: TCustomException) => void;
}
export type TServerOptions = {
    port: number;
    host: string;
    callback?: (exception?: TCustomException) => void;
}
export type TEndPointRequirements = {
    type: EndPointType;
    path: string;
}
export type TEndPointHandler = (req: Request, res: Response, next?: Function) => void;
export type TEndPoints = IEndPointController[];
