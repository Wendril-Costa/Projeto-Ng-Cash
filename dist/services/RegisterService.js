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
const conflict_error_1 = require("../err/conflict-error");
const account_1 = __importDefault(require("../database/models/account"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class RegisterService {
    create(register) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordHash = yield bcrypt_1.default.hash(register.password, 8);
            register.password = passwordHash;
            const isUser = yield user_1.default.findOne({ where: { username: register.username } });
            if (isUser)
                throw new conflict_error_1.ConflictError('O username já existe');
            const newAccount = yield account_1.default.create();
            const { id, username } = yield user_1.default.create(Object.assign(Object.assign({}, register), { accountId: newAccount.id }));
            return { id, username };
        });
    }
}
exports.RegisterService = RegisterService;
