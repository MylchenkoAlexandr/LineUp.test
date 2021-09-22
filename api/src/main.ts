import Config from './core/config';
import Server from './core/server';
import Database from './core/database';
import {TCustomException, TDatabaseOptions, TServerOptions} from './types';
import {logger} from './helpers';
import TEndPoints from './controllers/routes';

function bootstrap(): void {

    const cfg = Config.singleton();
    cfg.init();
    if (!cfg.initialized) return logger("Wrong config");

    const dbOptions: TDatabaseOptions = {
        url: cfg.config.databaseUrl,
        callback: (exception?: TCustomException): void => {
            if (exception) return logger("Error [database]:", exception);

            const serv = Server.singleton();
            const options: TServerOptions = {
                port: cfg.config.hostPort,
                host: cfg.config.host,
                callback: (exception?: TCustomException): void => {
                    if (exception) return logger("Error [host]:", exception);

                    try {serv.addRoute(TEndPoints)}
                    catch ({message}) {return logger("Error [routes]:", message)}
                }
            }
            serv.init(options);
        }
    }
    const db = Database.singleton();
    db.init(dbOptions);
}

bootstrap();
