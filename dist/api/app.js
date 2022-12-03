"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
const http_status_codes_1 = require("http-status-codes");
const resgiterRouter_1 = require("../routes/resgiterRouter");
const errorMiddleware_1 = require("../middlewares/errorMiddleware");
const loginRouter_1 = require("../routes/loginRouter");
const profileRouter_1 = require("../routes/profileRouter");
const TransactionRouter_1 = require("../routes/TransactionRouter");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.get('/', (req, res) => res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Ok' }));
        this.app.use(resgiterRouter_1.registerRouter, loginRouter_1.loginRouter, profileRouter_1.profileRouter, TransactionRouter_1.transactionRouter);
        this.app.use(errorMiddleware_1.errorMiddleware);
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Server is runing at http://localhost:${PORT}`));
    }
}
exports.App = App;
exports.app = new App().app;
