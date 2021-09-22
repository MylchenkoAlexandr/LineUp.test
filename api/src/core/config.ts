import dotenv from "dotenv";
import {Config_I} from "../interfaces";
import {ConfigType} from "../types";
import {logger} from "../helpers";

let _instance:Config = null ;
export default class Config implements Config_I {
    static singleton = ():Config => {
        if( ! _instance ) _instance = new Config() ;
        return _instance ;
    }

    private _config: ConfigType ;
    public get config():ConfigType {
        return this._config ;
    }

    private _initialized: boolean = false ;
    public get initialized(): boolean {
        return this._initialized ;
    }

    constructor() {
        /* debug */ logger( "Config", this );
    }

    private create(): any {
        return dotenv.config().parsed;
    }
    public init(): void {
        try {
            const params = this.create() ;

            /* debug */ logger( "Config.init([ params ])", params );

            this._config = {
                env: params.ENV,
                host: params.HOST_URL,
                hostPort: +params.HOST_PORT,
                databaseUrl: params.DATABASE
            }

            this._initialized = true ;

        } catch ({ message }) {
            /* error */ logger( "Config [error]", message );
            this._initialized = false ;
        }
    }
}
