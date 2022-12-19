"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const http_status_codes_1 = require("http-status-codes");
const SECRET = process.env.JWT_SECRET;
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token)
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'Token não encontrado' });
        try {
            jsonwebtoken_1.default.verify(token, SECRET);
            next();
        }
        catch (error) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'O token deve ser um token válido' });
        }
    });
}
exports.auth = auth;
