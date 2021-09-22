import {IDatabase} from "../interfaces";
import {TDatabaseOptions} from "../types";
import {logger} from "../helpers";
import mongoose, {Mongoose} from "mongoose";

let _instance: Database = null;
export default class Database implements IDatabase {
    static singleton = (): Database => {
        if (!_instance) _instance = new Database();
        return _instance;
    }

    constructor() {
        /* debug */
        logger("Database", this);
    }

    private _mongoose: Mongoose;
    public get mongoose(): Mongoose {
        return this._mongoose;
    }

    private _initialized: boolean = false;
    public get initialized(): boolean {
        return this._initialized;
    }

    private _options: TDatabaseOptions;
    private get options(): TDatabaseOptions {
        return this._options;
    }


    public init(options: TDatabaseOptions): void {
        /* debug */
        logger("Database.init([ options ])", options);

        this._options = options;
        try {
            this.create(options)
                .then((value) => {
                    /* debug */
                    logger(`Database.init([ value ])`, value);
                    this._initialized = true;
                    this._mongoose = value;

                    options.callback();
                })
                .catch((message) => {
                    /* debug */
                    logger(`Database.init([ message ])`, message);
                    this._initialized = false;
                    options.callback(message);
                });

        } catch ({message}) {
            this._initialized = false;
        }
    }
    private create(options: TDatabaseOptions): Promise<Mongoose> {
        return mongoose.connect(options.url);
    }
}
