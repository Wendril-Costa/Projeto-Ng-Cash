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
const propToken_1 = __importDefault(require("../auth/propToken"));
const transaction_1 = __importDefault(require("../database/models/transaction"));
const not_found_1 = require("../err/not-found");
const filterTransaction_1 = __importDefault(require("../utils/filterTransaction"));
const transfer_1 = __importDefault(require("../utils/transfer"));
class TransactionService {
    transaction({ username, value, token }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token)
                throw new not_found_1.NotFoundError('Token não encontrado');
            const result = (0, transfer_1.default)(username, value, token);
            return yield result;
        });
    }
    getTransaction(token, date) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token)
                throw new not_found_1.NotFoundError('Token não encontrado');
            const idToken = yield (0, propToken_1.default)(token);
            const transaction = yield transaction_1.default.findAll({
                where: {
                    [sequelize_1.Op.or]: [{ debitedAccountId: idToken }, { creditedAccountId: idToken }]
                }
            });
            if (date) {
                const filterDate = transaction.filter((e) => e.createdAt === date);
                const result = (0, filterTransaction_1.default)(filterDate, idToken);
                return yield result;
            }
            const result = (0, filterTransaction_1.default)(transaction, idToken);
            return yield result;
        });
    }
    creditedTransaction(token, date) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token)
                throw new not_found_1.NotFoundError('Token não encontrado');
            const idToken = yield (0, propToken_1.default)(token);
            const transaction = yield transaction_1.default.findAll({
                where: { creditedAccountId: idToken }
            });
            if (date) {
                const filterDate = transaction.filter((e) => e.createdAt === date);
                const result = (0, filterTransaction_1.default)(filterDate, idToken);
                return yield result;
            }
            const result = (0, filterTransaction_1.default)(transaction, idToken);
            return yield result;
        });
    }
    debitedTransaction(token, date) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token)
                throw new not_found_1.NotFoundError('Token não encontrado');
            const idToken = yield (0, propToken_1.default)(token);
            const transaction = yield transaction_1.default.findAll({
                where: { debitedAccountId: idToken }
            });
            if (date) {
                const filterDate = transaction.filter((e) => e.createdAt === date);
                const result = (0, filterTransaction_1.default)(filterDate, idToken);
                return yield result;
            }
            const result = (0, filterTransaction_1.default)(transaction, idToken);
            return yield result;
        });
    }
}
exports.TransactionService = TransactionService;
