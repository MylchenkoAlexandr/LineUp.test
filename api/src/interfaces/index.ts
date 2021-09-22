import { Express } from "express"
import { EndPointHandler, EndPointRequirements, EndPoints, ServerOptionsType, DatabaseOptionsType } from "../types"
import { EndPointType } from "../constants";
import { Mongoose } from "mongoose";

export interface Database_I {
    readonly mongoose: Mongoose ;
    readonly initialized: boolean ;
    init( options: DatabaseOptionsType ): void ;
}

export interface Server_I {
    readonly express: Express ;
    readonly initialized: boolean ;
    init( options: ServerOptionsType ): void ;
    addRoute( endpoint: EndPoints ): void ;
}

export interface EndPointController_I {
    readonly type: EndPointType ;
    readonly path: string ;

    create( args: EndPointRequirements ): EndPointController_I ;
    handler: EndPointHandler ;
}
