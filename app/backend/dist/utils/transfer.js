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
const propToken_1 = __importDefault(require("../auth/propToken"));
const account_1 = __importDefault(require("../database/models/account"));
const transaction_1 = __importDefault(require("../database/models/transaction"));
const user_1 = __importDefault(require("../database/models/user"));
const transfer = (username, value, token) => __awaiter(void 0, void 0, void 0, function* () {
    const idToken = yield (0, propToken_1.default)(token);
    const loginUser = yield user_1.default.findByPk(idToken);
    const loginAccount = yield account_1.default.findOne({ where: { id: idToken } });
    const loginBalance = loginAccount === null || loginAccount === void 0 ? void 0 : loginAccount.dataValues.balance;
    const destUser = yield user_1.default.findOne({ where: { username } });
    const destUserId = destUser === null || destUser === void 0 ? void 0 : destUser.dataValues.id;
    const destAccount = yield account_1.default.findByPk(destUserId);
    const destBalance = destAccount === null || destAccount === void 0 ? void 0 : destAccount.dataValues.balance;
    const debited = Number(loginBalance) - value;
    const credited = Number(destBalance) + value;
    yield account_1.default.upsert({ id: idToken, balance: debited });
    yield account_1.default.upsert({ id: destUserId, balance: credited });
    yield transaction_1.default.create({ debitedAccountId: idToken, creditedAccountId: destUserId, value });
    const data = { debitedAccount: loginUser === null || loginUser === void 0 ? void 0 : loginUser.dataValues.username, creditedAccount: username, value };
    return data;
});
exports.default = transfer;
