//FOR LAPTOP

import express from 'express';
import AdminRouter from './init/admin';
import GuestRouter from './init/guest';

let Router = express.Router();

AdminRouter(Router);
GuestRouter(Router);

export default Router;