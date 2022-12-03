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
exports.TransactionService = void 0;
const auth_1 = require("../auth/auth");
const account_1 = __importDefault(require("../database/models/account"));
const user_1 = __importDefault(require("../database/models/user"));
const missing_param_error_1 = require("../err/missing-param-error");
const not_found_1 = require("../err/not-found");
class TransactionService {
    transaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = transaction.token;
            if (!token)
                throw new not_found_1.NotFoundError('Token não encontrado');
            const idToken = yield (0, auth_1.propToken)(token);
            const myAccount = yield account_1.default.findByPk(idToken);
            // minha balanca account.balance = 100
            const username = yield user_1.default.findOne({ where: { username: transaction.username } });
            if (!myAccount || !username)
                throw new missing_param_error_1.MissingParamError('A conta não existe');
            const outerAccount = yield account_1.default.findByPk(username.id);
            if (!outerAccount)
                throw new missing_param_error_1.MissingParamError('A conta não existe');
            // outra balanca outerAccount.balance = 100
            const value = Number(transaction.value);
            const credited = Number(outerAccount.balance) + value;
            const debited = Number(myAccount.balance) - value;
        });
    }
}
exports.TransactionService = TransactionService;
