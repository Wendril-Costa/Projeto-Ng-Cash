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
const sequelize_1 = require("sequelize");
const http_status_codes_1 = require("http-status-codes");
const sinon_1 = __importDefault(require("sinon"));
const app_1 = require("../../api/app");
const LoginService_1 = require("../../services/LoginService");
chai_1.default.use(chai_http_1.default);
describe('POST /login', () => {
    describe('Quando o campo "username" não é informado ', () => {
        it('Deve retornar um status 400', () => __awaiter(void 0, void 0, void 0, function* () {
            const httpResponse = yield chai_1.default
                .request(app_1.app)
                .post('/login')
                .send({ password: 'any_password' });
            (0, chai_1.expect)(httpResponse.status).to.equal(http_status_codes_1.StatusCodes.BAD_REQUEST);
            (0, chai_1.expect)(httpResponse.body).to.deep.equal({ error: 'O campo "username" é obrigatório' });
        }));
    });
    describe('Quando o campo "password" não é informado ', () => {
        it('Deve retornar um status 400', () => __awaiter(void 0, void 0, void 0, function* () {
            const httpResponse = yield chai_1.default
                .request(app_1.app)
                .post('/login')
                .send({ username: 'any_username' });
            (0, chai_1.expect)(httpResponse.status).to.equal(http_status_codes_1.StatusCodes.BAD_REQUEST);
            (0, chai_1.expect)(httpResponse.body).to.deep.equal({ error: 'O campo "password" é obrigatório' });
        }));
    });
    describe('Quando o username não consta no banco de dados', () => {
        before(() => sinon_1.default.stub(sequelize_1.Model, 'findOne').resolves(null));
        after(() => sinon_1.default.restore());
        it('Deve retornar um status 403', () => __awaiter(void 0, void 0, void 0, function* () {
            const httpResponse = yield chai_1.default
                .request(app_1.app)
                .post('/login')
                .send({ username: 'any_username', password: 'Any_passwor1' });
            (0, chai_1.expect)(httpResponse.status).to.equal(403);
            (0, chai_1.expect)(httpResponse.body).to.deep.equal({ error: 'Username ou Password são inválidos' });
        }));
    });
    describe('Quando o username é encontrado mas a senha é incorreta', () => {
        const user = { id: 1, username: 'any_username', password: 'Any_password1' };
        before(() => sinon_1.default.stub(sequelize_1.Model, 'findOne').resolves(user));
        before(() => sinon_1.default.stub(LoginService_1.LoginService.prototype, 'checkPassword').returns(false));
        after(() => sinon_1.default.restore());
        it('Deve retornar um status 403', () => __awaiter(void 0, void 0, void 0, function* () {
            const httpResponse = yield chai_1.default
                .request(app_1.app)
                .post('/login')
                .send({ username: 'any_username', password: 'Wrong_password1' });
            (0, chai_1.expect)(httpResponse.status).to.equal(403);
            (0, chai_1.expect)(httpResponse.body).to.deep.equal({ error: 'Username ou Password são inválidos' });
        }));
    });
    describe('Quando as credenciais estão corretas', () => {
        const passowrdBcrypt = '$2b$08$J4HUMRJS0yKI.qqhMUVzYur5JsinVFIdShoXW/UaiDjK6XZANxYFq';
        const user = { id: 1, username: 'any_username', password: passowrdBcrypt };
        before(() => sinon_1.default.stub(sequelize_1.Model, 'findOne').resolves(user));
        before(() => sinon_1.default.stub(LoginService_1.LoginService.prototype, 'checkPassword').returns(true));
        after(() => sinon_1.default.restore());
        it('Deve retornar um status 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const httpResponse = yield chai_1.default
                .request(app_1.app)
                .post('/login')
                .send({ username: 'any_username', password: 'Any_password1' });
            (0, chai_1.expect)(httpResponse.status).to.equal(http_status_codes_1.StatusCodes.OK);
            (0, chai_1.expect)(httpResponse.body).to.have.key('token');
            (0, chai_1.expect)(httpResponse.body.token).to.be.a('string');
        }));
    });
});
