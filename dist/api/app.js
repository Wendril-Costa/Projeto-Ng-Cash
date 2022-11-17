"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const http_status_codes_1 = require("http-status-codes");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.get('/', (req, res) => res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Ok' }));
        this.app.post('/users', (req, res) => res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: 'O campo "username" é obrigatório' }));
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Server is runing at http://localhost:${PORT}`));
    }
}
exports.App = App;
exports.app = new App().app;
