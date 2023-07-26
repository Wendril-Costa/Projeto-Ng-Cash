"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const sinon_1 = __importDefault(require("sinon"));
const app_1 = require("../../api/app");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const SECRET = process.env.JWT_SECRET;
chai_1.default.use(chai_http_1.default);
describe('GET /profile/:id', () => {
    describe('Quando a requisição é feita com sucesso', () => {
        const account = { id: 1, balance: 100 };
        const user = { id: 1, username: 'any_username' };
        const token = jsonwebtoken_1.default.sign(user, SECRET, {
            expiresIn: '1d',
            algorithm: 'HS256'
        });
        before(() => sinon_1.default.stub(sequelize_1.Model, 'findByPk').resolves(account));
        before(() => sinon_1.default.stub(jsonwebtoken_1.default, 'verify').resolves(token));
        after(() => sinon_1.default.restore());
        it('Deve retornar um status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const httpResponse = yield chai_1.default
                .request(app_1.app)
                .get('/profile/:id')
                .set('Authorization', `Bearer ${token}`);
            (0, chai_1.expect)(httpResponse.status).to.equal(http_status_codes_1.StatusCodes.OK);
            (0, chai_1.expect)(httpResponse.body).to.be.a('object');
            (0, chai_1.expect)(httpResponse.body.id).to.be.a('number');
            (0, chai_1.expect)(httpResponse.body.balance).to.be.a('number');
        }));
    });
});
