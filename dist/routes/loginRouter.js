"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = void 0;
const express_1 = require("express");
const LoginController_1 = require("../controllers/LoginController");
const validateBody_1 = require("../middlewares/validateBody");
const LoginService_1 = require("../services/LoginService");
const loginService = new LoginService_1.LoginService();
const loginController = new LoginController_1.LoginController(loginService);
const router = (0, express_1.Router)();
exports.loginRouter = router;
router
    .post('/login', (0, validateBody_1.validateBody)(['username', 'password']), (req, res) => loginController.login(req, res));
