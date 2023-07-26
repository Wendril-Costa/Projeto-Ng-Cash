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
const sequelize_1 = require("sequelize");
const auth_1 = require("../auth/auth");
const account_1 = __importDefault(require("../database/models/account"));
const transaction_1 = __importDefault(require("../database/models/transaction"));
const user_1 = __importDefault(require("../database/models/user"));
const not_found_1 = require("../err/not-found");
class TransactionService {
    transaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = transaction.token;
            if (!token)
                throw new not_found_1.NotFoundError('Token não encontrado');
            const idToken = yield (0, auth_1.propToken)(token); // id do usuario logado
            const dataOne = yield account_1.default.findOne({ where: { id: idToken } });
            const myAccount = dataOne === null || dataOne === void 0 ? void 0 : dataOne.dataValues.balance; // saldo da conta logada
            const dataUser = yield user_1.default.findOne({ where: { username: transaction.username } });
            const usernameId = dataUser === null || dataUser === void 0 ? void 0 : dataUser.dataValues.id; // id do usuario digitado
            const dataTwo = yield account_1.default.findByPk(usernameId);
            const outerAccount = dataTwo === null || dataTwo === void 0 ? void 0 : dataTwo.dataValues.balance; // saldo da conta digitada
            const value = Number(transaction.value);
            const debited = Number(myAccount) - value;
            const credited = Number(outerAccount) + value;
            yield account_1.default.upsert({ id: idToken, balance: debited });
            yield account_1.default.upsert({ id: usernameId, balance: credited });
            const data = yield transaction_1.default.create({ debitedAccountId: idToken, creditedAccountId: usernameId, value });
            return { message: 'Transação feita com sucesso', data };
        });
    }
    getTransaction(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token)
                throw new not_found_1.NotFoundError('Token não encontrado');
            const idToken = yield (0, auth_1.propToken)(token);
            const transaction = yield transaction_1.default.findAll({
                where: {
                    [sequelize_1.Op.or]: [{ debitedAccountId: idToken }, { creditedAccountId: idToken }]
                }
            });
            const result = transaction.map((e) => __awaiter(this, void 0, void 0, function* () {
                const userCredit = yield user_1.default.findByPk(Number(e.creditedAccountId));
                const usernameCredit = userCredit === null || userCredit === void 0 ? void 0 : userCredit.username;
                const userDebit = yield user_1.default.findByPk(Number(e.debitedAccountId));
                const usernameDebit = userDebit === null || userDebit === void 0 ? void 0 : userDebit.username;
                const object = {
                    credited: usernameCredit,
                    debited: usernameDebit,
                    value: Number(e.value),
                    date: e.createdAt
                };
                if (Number(e.debitedAccountId) === idToken) {
                    object.value = e.value * -1;
                    return object;
                }
                return object;
            }));
            return yield Promise.all(result);
        });
    }
    creditedTransaction(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token)
                throw new not_found_1.NotFoundError('Token não encontrado');
            const idToken = yield (0, auth_1.propToken)(token);
            const transaction = yield transaction_1.default.findAll({
                where: { creditedAccountId: idToken }
            });
            return transaction.map(({ value }) => Number(value));
        });
    }
    debitedTransaction(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token)
                throw new not_found_1.NotFoundError('Token não encontrado');
            const idToken = yield (0, auth_1.propToken)(token);
            const transaction = yield transaction_1.default.findAll({
                where: { debitedAccountId: idToken }
            });
            return transaction.map(({ value }) => Number(value) * -1);
        });
    }
}
exports.TransactionService = TransactionService;
