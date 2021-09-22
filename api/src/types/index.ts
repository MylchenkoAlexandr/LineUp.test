import {RequestMethodTypes} from "../constants";
import {Request, Response} from "express";
import {IEndPointController} from "../interfaces"

export type TCustomException = Error | string | any;
export type TErrorMessage = {
    message: string | null
}

export type TConfig = {
    env: string;
    databaseUrl: string;
    hostPort: number;
    host: string;
    secret: string;
    sessionTimeout:string;
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
export type TEndPointHandler = (req: Request, res: Response, next?: Function) => void;
export type TEndPointRequirements = {
    type: RequestMethodTypes;
    path: string;
    middlewares?: TEndPointHandler[] ;
}
export type TEndPoints = IEndPointController[];
export type TResponseSuccess = {
    success: boolean;
    data: any | null
}

export type TResponseFailed = {
    success: boolean;
    error: TErrorMessage
}
