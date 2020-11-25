import mongoose from 'mongoose';
import bluebird from 'bluebird';

import Config from '../../config/api.config';

export const MongoInit = async () => {
    bluebird.promisifyAll(mongoose);

    global.DBConnect = false;

    mongoose.connection.on("connected", function(err) {
        global.DBConnect = true;
    });

    mongoose.connection.on("error", function(err) {
        global.DBConnect = false;
        global.StatusMongo = 'Database: Connection Error';
    });
      
    mongoose.connection.on('disconnected', function () {
        global.DBConnect = false;
        global.StatusMongo = 'Database: Disconnect';
    });
    
    try {
        await mongoose.connect(Config.database, { 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            bufferCommands: false,
            bufferMaxEntries: 0
        });
    }
    catch(e){
        global.DBConnect = false;
        global.StatusMongo = 'Database: Connection Error';
    }
};