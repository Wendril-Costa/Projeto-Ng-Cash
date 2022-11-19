"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = void 0;
const http_status_codes_1 = require("http-status-codes");
const RegisterService_1 = require("../services/RegisterService");
class RegisterController {
    constructor() {
        this.registerService = new RegisterService_1.RegisterService();
    }
    create(req, res) {
        const error = this.registerService.create(req.body);
        if (error)
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(error);
        return res.sendStatus(http_status_codes_1.StatusCodes.CREATED);
    }
}
exports.RegisterController = RegisterController;
