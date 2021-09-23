import dotenv from "dotenv";
import {IConfig} from "../interfaces";
import {TConfig} from "../types";
import {logger} from "../helpers";

let _instance: Config = null;
export default class Config implements IConfig {
    static singleton = (): Config => {
        if (!_instance) _instance = new Config();
        return _instance;
    }

    constructor() {}

    private _config: TConfig;
    public get config(): TConfig {
        return this._config;
    }

    private _initialized: boolean = false;
    public get initialized(): boolean {
        return this._initialized;
    }

    public init(): void {
        try {
            const params = this.create();
            this._config = {
                env: params.ENV,
                host: params.HOST_URL,
                hostPort: +params.HOST_PORT,
                databaseUrl: params.DATABASE,
                secret: params.SECRET,
                sessionTimeout: params.SESSION_TIMEOUT
            }

            this._initialized = true;

        } catch ({message}) {
            /* error */ logger("Config [error]", message);
            this._initialized = false;
        }
    }
    private create(): any {
        return dotenv.config().parsed;
    }
}
