import {Database_I} from "../interfaces";
import {DatabaseOptionsType} from "../types";
import {logger} from "../helpers";
import Mongoose from "mongoose";

let _instance:Database = null ;
export default class Database implements Database_I {
    static singleton = ():Database => {
        if( ! _instance ) _instance = new Database() ;
        return _instance ;
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

    private async create( options: DatabaseOptionsType ): Promise<void> {
        const a = await Mongoose.connect( options.url ) ;
        /* debug */ logger( `Database.create([ a ])`, a ) ;
    }

    public async init( options: DatabaseOptionsType ): Promise<void> {
        /* debug */ logger( "Database.init([ options ])", options );

        this._options = options ;

        try {

            await this.create( options ) ;

            this._initialized = true ;

            /* debug */ logger( `Database.init()`, options ) ;

        } catch ({ message }) {
            this._initialized = false ;
        }
    }
}
