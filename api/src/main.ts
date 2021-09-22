import Config from './core/config';
import Server from './core/server';
import Database from './core/database';
import {CustomException, DatabaseOptionsType, ServerOptionsType} from './types';
import {logger} from './helpers';
import EndPoints from './controllers/routes';

function bootstrap():void {

    const cfg = Config.singleton() ;
    cfg.init() ;
    if( ! cfg.initialized ) return logger( "Wrong config" ) ;

    const dbOptions:DatabaseOptionsType = {
        url: cfg.config.databaseUrl,
        callback: (exception?: CustomException): void => {
            if( exception ) return logger( "Error [database]:", exception );

            const serv = Server.singleton() ;
            const options: ServerOptionsType = {
                port: cfg.config.hostPort,
                host: cfg.config.host,
                callback: ( exception?: CustomException ): void => {
                    if( exception ) return logger( "Error [host]:", exception );

                    try { serv.addRoute( EndPoints ) }
                    catch({ message }) { return logger( "Error [routes]:", message ) }
                }
            }
            serv.init( options ) ;
        }
    }
    const db = Database.singleton() ;
    db.init( dbOptions );
}

bootstrap() ;
