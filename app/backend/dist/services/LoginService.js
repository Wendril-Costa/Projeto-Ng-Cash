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
require("dotenv/config");
const user_1 = __importDefault(require("../database/models/user"));
const unauthorized_error_1 = require("../err/unauthorized-error");
const checkPassword_1 = __importDefault(require("../utils/checkPassword"));
const creatToken_1 = __importDefault(require("../auth/creatToken"));
class LoginService {
    login(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const userLogin = yield user_1.default.findOne({ where: { username: login.username } });
            if (!userLogin || !(0, checkPassword_1.default)(userLogin.password, login.password)) {
                throw new unauthorized_error_1.UnauthorizedError('Username ou Password são inválidos');
            }
            const { id, username } = userLogin;
            const token = (0, creatToken_1.default)({ id, username });
            return yield token;
        });
    }
}
exports.LoginService = LoginService;
