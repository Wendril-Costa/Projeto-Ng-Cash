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
exports.RegisterService = void 0;
const user_1 = __importDefault(require("../database/models/user"));
const missing_param_error_1 = require("../err/missing-param-error");
const conflict_error_1 = require("../err/conflict-error");
const account_1 = __importDefault(require("../database/models/account"));
class RegisterService {
    create(register) {
        return __awaiter(this, void 0, void 0, function* () {
            const requiredFields = ['username', 'password'];
            for (const field of requiredFields) {
                if (!register[field]) {
                    throw new missing_param_error_1.MissingParamError(`O campo "${field}" é obrigatório`);
                }
            }
            if (register.username.length < 3) {
                throw new missing_param_error_1.MissingParamError('O campo "username" deve ter pelo menos 3 caracteres');
            }
            const isUser = yield user_1.default.findOne({ where: { username: register.username } });
            console.log(isUser);
            if (isUser) {
                throw new conflict_error_1.ConflictError('O username já existe');
            }
            const { id } = yield account_1.default.create();
            console.log(id);
            const newUser = yield user_1.default.create(Object.assign(Object.assign({}, register), { accountId: id }));
            console.log(newUser);
            return { newUser };
        });
    }
}
exports.RegisterService = RegisterService;
