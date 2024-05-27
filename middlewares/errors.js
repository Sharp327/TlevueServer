"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (err, req, res) => {
    let error = Object.assign({}, err);
    error.statusCode = err.statusCode || 500;
    error.message = err.message || 'Internal Server Error';
    res.status(error.statusCode).json({
        success: false,
        error,
        message: error.message,
        stack: error.stack,
    });
};
