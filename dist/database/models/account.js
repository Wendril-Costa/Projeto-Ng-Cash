"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const user_1 = __importDefault(require("./user"));
class Account extends sequelize_1.Model {
}
Account.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    balance: {
        type: sequelize_1.DECIMAL,
        allowNull: false,
        defaultValue: 100.0
    }
}, {
    sequelize: _1.default,
    modelName: 'accounts',
    timestamps: false
});
Account.hasOne(user_1.default, { foreignKey: 'accountId', as: 'users' });
Account.hasMany(user_1.default, { foreignKey: 'accountId', as: 'transactions' });
exports.default = Account;