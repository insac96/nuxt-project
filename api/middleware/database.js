import { ErrorHandler } from '../plugins/error';

export default (req, res, next) => {
    if(!global.DBConnect) return next(new ErrorHandler(502, global.StatusMongo));

    next();
};