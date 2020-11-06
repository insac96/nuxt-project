//Core
import { ExpressInit } from './core/express';
import { MongoInit } from './core/mongo';

//Middleware
import DatabaseMiddleware from './middleware/database';
import EmptyMiddleware from './middleware/empty';

//Router
import LaptopRouter from './router/laptop/index';
import UserRouter from './router/user/index';

//Mongo Connect
MongoInit();

//App Init
const App = ExpressInit();
App.use(DatabaseMiddleware);

//API Router
App.use('/laptop', LaptopRouter);
App.use('/user', UserRouter);

//API Empty
App.use(EmptyMiddleware);

//Export
export default App;