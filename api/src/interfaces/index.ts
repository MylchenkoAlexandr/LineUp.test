import {Express} from "express"
import {TConfig, TDatabaseOptions, TEndPointHandler, TEndPointRequirements, TEndPoints, TServerOptions} from "../types";
import {RequestMethodTypes} from "../constants";
import {Mongoose} from "mongoose";

export interface IConfig {
    readonly config: TConfig;
    readonly initialized: boolean;

    init(): void;
}
export interface IDatabase {
    readonly mongoose: Mongoose;
    readonly initialized: boolean;

    init(options: TDatabaseOptions): void;
}
export interface IServer {
    readonly express: Express;
    readonly initialized: boolean;

    init(options: TServerOptions): void;
    addRoute(endpoint: TEndPoints): void;
}
export interface IEndPointController {
    readonly type: RequestMethodTypes;
    readonly path: string;
    handler: TEndPointHandler;
    middlewares?: TEndPointHandler[] ;

    create(args: TEndPointRequirements): IEndPointController;
}
