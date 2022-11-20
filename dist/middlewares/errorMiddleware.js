"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const errorMiddleware = (err, req, res, next) => {
    if (err.status) {
        return res.status(err.status).json({ error: err.message });
    }
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
};
exports.errorMiddleware = errorMiddleware;
