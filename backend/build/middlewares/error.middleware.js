"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (error, _req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Whops something went wrong!';
    res.status(status).json({ status, message });
};
exports.default = errorMiddleware;
