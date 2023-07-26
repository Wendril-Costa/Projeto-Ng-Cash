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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
require("dotenv/config");
const http_status_codes_1 = require("http-status-codes");
class ProfileController {
    constructor(balanceService) {
        this.profileService = balanceService;
    }
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authorization: token } = req.headers;
            const balance = yield this.profileService.getProfile(token);
            return res.status(http_status_codes_1.StatusCodes.OK).json(balance);
        });
    }
}
exports.ProfileController = ProfileController;
