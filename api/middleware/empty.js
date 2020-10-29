export default (req, res) => {
    res.status(404).json({
        error: true,
        message: `Path ${req.originalUrl} Does Not Exist`
    });
};