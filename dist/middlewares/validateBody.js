"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const invalid_param_error_1 = require("../err/invalid-param-error");
const missing_param_error_1 = require("../err/missing-param-error");
const validateBody = (requiredFields) => (req, res, next) => {
    const regexNumber = /[0-9]/;
    const regexUpperCase = /[A-Z]/;
    for (const field of requiredFields) {
        if (!req.body[field])
            throw new missing_param_error_1.MissingParamError(`O campo "${field}" é obrigatório`);
    }
    if (req.body.username.length < 3) {
        throw new invalid_param_error_1.InvalidParamError('O campo "username" deve ter pelo menos 3 caracteres');
    }
    if (req.body.password.length < 8) {
        throw new invalid_param_error_1.InvalidParamError('O campo "password" deve ter pelo menos 8 caracteres');
    }
    if (!regexNumber.test(req.body.password)) {
        throw new invalid_param_error_1.InvalidParamError('O campo "password" deve ter um numero');
    }
    if (!regexUpperCase.test(req.body.password)) {
        throw new invalid_param_error_1.InvalidParamError('O campo "password" deve ter uma letra maiuscula');
    }
    next();
};
exports.validateBody = validateBody;
