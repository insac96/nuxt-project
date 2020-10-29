export default (req, res, next) => {
    if(!global.DBConnect) return res.status(502).json({
        error: true,
        message: global.StatusMongo
    });

    next();
};