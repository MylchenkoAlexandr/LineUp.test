import express, { Express, Router } from 'express';
import { Server_I } from "../interfaces";
import { EndPoints, ServerOptionsType } from "../types";
import { logger } from "../helpers";
import { EndPointInitialPath } from "../constants";
import EndPointControllerBase from "../base/EndPointControllerBase";

let _instance:Server = null ;
export default class Server implements Server_I {
    static singleton = ():Server => {
        if( ! _instance ) _instance = new Server() ;
        return _instance ;
    }

    private _express: Express ;
    public get express():Express {
        return this._express ;
    }

    private _initialized: boolean = false ;
    public get initialized(): boolean {
        return this._initialized ;
    }

    private _router:Router ;
    private get router():Router {
        return this._router ;
    }

    private _options:ServerOptionsType;
    private get options():ServerOptionsType {
        return this._options ;
    }

    constructor() {
        /* debug */ logger( "Server", this );
    }

    private create(): void {
        if( ! this._express ) this._express = express() ;
        if( ! this._router ) this._router = express.Router({ mergeParams: true });
    }
    public init( options: ServerOptionsType ): void {
        /* debug */ logger( "Server.init([ options ])", options );

        try {
            this._options = options ;

            this.create() ;
            this.express.use( express.json() ) ;
            this.express.listen(
                options.port,
                options.host,
                options.callback
            );

            this._initialized = true ;

            /* debug */ logger( `Server.init()`, `Listening on //${ options.host }:${ options.port }/${ EndPointInitialPath }/*` ) ;

        } catch ({ message }) {
            this._initialized = false ;
            options.callback( message ) ;
        }
    }
    public addRoute( endpoints: EndPoints ): void {
        if( this.initialized) {

            endpoints.forEach( ( endpoint: EndPointControllerBase  ) => {
                logger( `Server.addRoute([+])`, `${ endpoint.type.toUpperCase() } //${ this.options.host }:${ this.options.port }/${ EndPointInitialPath }${ endpoint.path }` );
                this.router.route( endpoint.path )[ endpoint.type ]( endpoint.handler );
            } ) ;
            this.express.use( `/${ EndPointInitialPath }`, this.router ) ;


        } else {
            throw new Error( "Server.addRoute([ error ]) Express not initialized" ) ;
        }
    }
}
