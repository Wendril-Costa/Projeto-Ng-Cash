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
const user_1 = __importDefault(require("../database/models/user"));
const filterTransaction = (array, idToken) => __awaiter(void 0, void 0, void 0, function* () {
    const result = array.map((e) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(typeof e);
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
exports.default = filterTransaction;
