"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../auth/auth");
const TransactionController_1 = require("../controllers/TransactionController");
const TransactionService_1 = require("../services/TransactionService");
const transactionService = new TransactionService_1.TransactionService();
const transactionController = new TransactionController_1.TransactionController(transactionService);
const router = (0, express_1.Router)();
exports.transactionRouter = router;
router
    .post('/transaction', auth_1.auth, (req, res) => transactionController.transaction(req, res));
