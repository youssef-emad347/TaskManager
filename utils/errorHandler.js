export default (err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        statusCode: err.status || 500,
        message: err.message || "Internal server error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};
