import { Express } from "express"
import { EndPointHandler, EndPointRequirements, EndPoints, ServerOptions, DatabaseOptionsType } from "../types"
import { EndPointType } from "../constants";

export interface Database_I {
    readonly initialized: boolean ;
    init( options: DatabaseOptionsType ): Promise<void> ;
}

export interface Server_I {
    readonly express: Express ;
    readonly initialized: boolean ;
    init( options: ServerOptions ): void ;
    addRoute( endpoint: EndPoints ): void ;
}

export interface EndPointController_I {
    readonly type: EndPointType ;
    readonly path: string ;

    create( args: EndPointRequirements ): EndPointController_I ;
    handler: EndPointHandler ;
}
