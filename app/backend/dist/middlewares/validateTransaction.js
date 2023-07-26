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
exports.validateTransaction = void 0;
const propToken_1 = __importDefault(require("../auth/propToken"));
const account_1 = __importDefault(require("../database/models/account"));
const user_1 = __importDefault(require("../database/models/user"));
const conflict_error_1 = require("../err/conflict-error");
const missing_param_error_1 = require("../err/missing-param-error");
const not_found_1 = require("../err/not-found");
const validateTransaction = (requiredTransactions) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization: token } = req.headers;
    const { username, value } = req.body;
    for (const field of requiredTransactions) {
        if (!req.body[field])
            throw new missing_param_error_1.MissingParamError(`O campo "${field}" é obrigatório`);
    }
    const existUsernameBody = yield user_1.default.findOne({ where: { username } });
    if (!existUsernameBody)
        throw new not_found_1.NotFoundError('O usuario não existe');
    if (!token)
        throw new not_found_1.NotFoundError('Token não encontrado');
    const idToken = yield (0, propToken_1.default)(token);
    const loginUser = yield user_1.default.findOne({ where: { id: idToken } });
    const loginAccount = yield account_1.default.findOne({ where: { id: idToken } });
    const loginUsername = loginUser === null || loginUser === void 0 ? void 0 : loginUser.dataValues.username;
    const loginBalance = loginAccount === null || loginAccount === void 0 ? void 0 : loginAccount.dataValues.balance;
    if (loginUsername === username)
        throw new conflict_error_1.ConflictError('Não é possivel realizar uma transferencia para você mesmo');
    if (value > loginBalance)
        throw new conflict_error_1.ConflictError('Saldo Insuficiente');
    next();
});
exports.validateTransaction = validateTransaction;
