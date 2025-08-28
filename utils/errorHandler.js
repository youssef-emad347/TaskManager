export default (err, req, res, next) => {
    // Log the error for debugging purposes
    console.error(err);

    res.status(err.status || 500).json({
        status: "failure",
        statusCode: err.status || 500,
        message: err.message || "Internal server error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};
