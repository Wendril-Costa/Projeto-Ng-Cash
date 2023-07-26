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
exports.ProfileService = void 0;
const propToken_1 = __importDefault(require("../auth/propToken"));
const account_1 = __importDefault(require("../database/models/account"));
const user_1 = __importDefault(require("../database/models/user"));
const not_found_1 = require("../err/not-found");
class ProfileService {
    getProfile(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token)
                throw new not_found_1.NotFoundError('Token não encontrado');
            const idToken = yield (0, propToken_1.default)(token);
            const user = yield user_1.default.findByPk(idToken);
            const account = yield account_1.default.findByPk(idToken);
            if (!user || !account)
                throw new not_found_1.NotFoundError('O usuario não existe');
            return { id: user.id, username: user.username, balance: account.balance };
        });
    }
}
exports.ProfileService = ProfileService;
