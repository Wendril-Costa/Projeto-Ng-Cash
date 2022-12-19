"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = void 0;
class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.status = 409;
    }
}
exports.ConflictError = ConflictError;
