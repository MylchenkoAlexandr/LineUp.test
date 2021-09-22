import Server from './core/server';
import Database from './core/database';
import { CustomException, ServerOptions } from './types';
import { logger } from './helpers';
import { ApplicationOptions, DBOptions } from './constants';
import EndPoints from './controllers/routes';


const db = Database.singleton() ;
db.init( DBOptions ).then(value => {
    logger( "Main([ value ])", value );
} ).catch(reason => {
    logger( "Main([ reason ])", reason );
} ) ;

/*
const serv = Server.singleton() ;
const options: ServerOptions = {
    port: ApplicationOptions.port,
    host: ApplicationOptions.host,
    callback: ( exception?: CustomException ): void => {
        if( exception ) {
            logger( "Main([ exception ])", exception );
            return ;

        } else {
            try { serv.addRoute( EndPoints ) }
            catch({ message }) {
                logger( "Main([ error ])", message );
            }
        }
    }
}
serv.init( options ) ;
*/
