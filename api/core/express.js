import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { SetGlobal } from './global'

export const ExpressInit = () => {
    let App = express();
    SetGlobal();

    App.use(cors());
    App.use(bodyParser.json({limit: '50mb'}));
    App.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    App.use(helmet.frameguard());
    App.use(helmet.xssFilter());
    App.use(helmet.noSniff());
    App.use(helmet.ieNoOpen());
    App.use(helmet.hsts({ maxAge: 15778476, includeSubDomains: true, force: true }));
    App.disable('x-powered-by');
    App.use(cookieParser());

    return App;
};
