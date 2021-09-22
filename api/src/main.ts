import Server from './core/server';
import Database from './core/database';
import { CustomException, ServerOptionsType, DatabaseOptionsType } from './types';
import { logger } from './helpers';
import { ApplicationOptions, DBOptions } from './constants';
import EndPoints from './controllers/routes';

function bootstrap():void {
    const dbOptions:DatabaseOptionsType = {
        url: DBOptions.url,
        callback: (exception?: CustomException): void => {
            if( exception ) return logger( "Error [database]:", exception );

            const serv = Server.singleton() ;
            const options: ServerOptionsType = {
                port: ApplicationOptions.port,
                host: ApplicationOptions.host,
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