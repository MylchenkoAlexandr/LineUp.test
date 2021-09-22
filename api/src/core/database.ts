import {Database_I} from "../interfaces";
import {DatabaseOptionsType} from "../types";
import {logger} from "../helpers";
import mongoose, { Mongoose } from "mongoose";
import {Express} from "express";

let _instance:Database = null ;
export default class Database implements Database_I {
    static singleton = ():Database => {
        if( ! _instance ) _instance = new Database() ;
        return _instance ;
    }

    private _mongoose: Mongoose ;
    public get mongoose():Mongoose {
        return this._mongoose ;
    }

    private _initialized: boolean = false ;
    private _options:DatabaseOptionsType;

    private get options():DatabaseOptionsType {
        return this._options ;
    }
    public get initialized(): boolean {
        return this._initialized ;
    }

    constructor() {
        /* debug */ logger( "Database", this );
    }

    private create( options: DatabaseOptionsType ): Promise<Mongoose> {
        return mongoose.connect( options.url ) ;
    }
    public init( options: DatabaseOptionsType ): void {
        /* debug */ logger( "Database.init([ options ])", options );

        this._options = options ;
        try {
            this.create( options )
                .then( (value) => {
                    /* debug */ logger( `Database.init([ value ])`, value ) ;
                    this._initialized = true ;
                    this._mongoose = value;

                    options.callback() ;
                })
                .catch( (message) => {
                    /* debug */ logger( `Database.init([ message ])`, message ) ;
                    this._initialized = false ;
                    options.callback( message ) ;
                });

        } catch ({ message }) {
            this._initialized = false ;
        }
    }
}
