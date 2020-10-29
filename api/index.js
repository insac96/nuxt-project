import { ExpressInit } from './lib/express';
import { MongoInit } from './lib/mongo';

//Router
import LaptopRouter from './router/laptop/index';
import UserRouter from './router/user/index';

//Mongo Connect
MongoInit();

//App Init
let App = ExpressInit();

App.use('/laptop', LaptopRouter);
App.use('/user', UserRouter);

App.use((req, res, next) => {
    if(!global.DBConnect) return res.status(502).json({
        error: true,
        message: global.StatusMongo
    });

    next();
});

App.get('*', (req, res) => {
    console.log(req.originalUrl)
    res.status(502).json({
        error: true,
        message: `Path ${req.originalUrl} Does Not Exist`
    });
});

//Export
export default App;