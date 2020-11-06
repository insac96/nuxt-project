export default (req, res, next) => {
    next(new ErrorHandler(404, `Path (${req.originalUrl}) Does Not Exist`));
};