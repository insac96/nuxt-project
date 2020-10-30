import { ExpressInit } from './core/express';
import { MongoInit } from './core/mongo';
import DatabaseMiddleware from './middleware/database';
import EmptyMiddleware from './middleware/empty';

//Router
import LaptopRouter from './router/laptop/index';
import UserRouter from './router/user/index';

//Mongo Connect
MongoInit();

//App Init
let App = ExpressInit();
App.use(DatabaseMiddleware);

//App Router
App.use('/laptop', LaptopRouter);
App.use('/user', UserRouter);

//App Empty
App.use(EmptyMiddleware);

//Export
export default App;