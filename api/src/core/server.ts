import express, {Express, Router} from 'express';
import {IServer} from "../interfaces";
import {TEndPoints, TServerOptions} from "../types";
import {logger} from "../helpers";
import {EndPointInitialPath} from "../constants";
import EndPointControllerBase from "../base/EndPointControllerBase";
import cors from "cors";

let _instance: Server = null;
export default class Server implements IServer {
    static singleton = (): Server => {
        if (!_instance) _instance = new Server();
        return _instance;
    }

    constructor() {
        /* debug */ logger("Server()", this);
    }

    private _express: Express;
    public get express(): Express {
        return this._express;
    }

    private _initialized: boolean = false;
    public get initialized(): boolean {
        return this._initialized;
    }

    private _router: Router;
    private get router(): Router {
        return this._router;
    }

    private _options: TServerOptions;
    private get options(): TServerOptions {
        return this._options;
    }

    public init(options: TServerOptions): void {
        try {
            this._options = options;

            this.create();
            this.express.use(cors());
            this.express.use(express.json());
            this.express.listen(
                options.port,
                options.host,
                options.callback
            );

            this._initialized = true;

            /* debug */ logger(`Server.init()`, `Listening on //${options.host}:${options.port}/${EndPointInitialPath}/*`);

        } catch ({message}) {
            this._initialized = false;
            options.callback(message);
        }
    }
    public addRoute(endpoints: TEndPoints): void {
        if (!this.initialized) throw new Error("Server.addRoute([ error ]) Express not initialized");
        endpoints.forEach((endpoint: EndPointControllerBase) => {
            const { middlewares } = endpoint ;
            /* debug */ logger(`Server.addRoute([+])`, `${endpoint.type.toUpperCase()} //${this.options.host}:${this.options.port}/${EndPointInitialPath}${endpoint.path}`);
            this.router.route(endpoint.path)[endpoint.type]( ... middlewares, endpoint.handler );
        });
        this.express.use(`/${EndPointInitialPath}`, this.router);
    }
    private create(): void {
        if (!this._express) this._express = express();
        if (!this._router) this._router = express.Router({mergeParams: true});
    }
}
