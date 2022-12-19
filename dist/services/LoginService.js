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
exports.LoginService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../database/models/user"));
const unauthorized_error_1 = require("../err/unauthorized-error");
const SECRET = process.env.JWT_SECRET;
class LoginService {
    checkPassword(userPassword, bodyPassword) {
        const check = bcrypt_1.default.compare(bodyPassword, userPassword);
        if (!check)
            return false;
        return true;
    }
    login(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const userLogin = yield user_1.default.findOne({ where: { username: login.username } });
            if (!userLogin || !this.checkPassword(userLogin.password, login.password)) {
                throw new unauthorized_error_1.UnauthorizedError('Username ou Password são inválidos');
            }
            const { id, username } = userLogin;
            const token = jsonwebtoken_1.default.sign({ id, username }, SECRET, {
                expiresIn: '1d',
                algorithm: 'HS256'
            });
            return { token };
        });
    }
}
exports.LoginService = LoginService;
