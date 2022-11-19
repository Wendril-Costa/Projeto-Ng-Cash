"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRouter = void 0;
const express_1 = require("express");
const RegisterController_1 = require("../controllers/RegisterController");
const registerController = new RegisterController_1.RegisterController();
const router = (0, express_1.Router)();
exports.registerRouter = router;
router.post('/register', (req, res) => registerController.create(req, res));
