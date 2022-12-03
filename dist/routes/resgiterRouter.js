"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRouter = void 0;
const express_1 = require("express");
const RegisterController_1 = require("../controllers/RegisterController");
const validateBody_1 = require("../middlewares/validateBody");
const RegisterService_1 = require("../services/RegisterService");
const registerService = new RegisterService_1.RegisterService();
const registerController = new RegisterController_1.RegisterController(registerService);
const router = (0, express_1.Router)();
exports.registerRouter = router;
router
    .post('/register', (0, validateBody_1.validateBody)(['username', 'password']), (req, res) => registerController.create(req, res));
