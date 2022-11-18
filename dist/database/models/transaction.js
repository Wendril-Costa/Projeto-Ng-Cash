"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const account_1 = __importDefault(require("./account"));
class Transaction extends sequelize_1.Model {
}
Transaction.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    debitedAccountId: {
        type: sequelize_1.INTEGER,
        allowNull: false
    },
    creditedAccountId: {
        type: sequelize_1.INTEGER
    },
    value: {
        type: sequelize_1.DECIMAL,
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DATE,
        allowNull: false,
        defaultValue: sequelize_1.NOW
    }
}, {
    sequelize: _1.default,
    modelName: 'transactions',
    timestamps: false
});
Transaction.belongsTo(account_1.default, { foreignKey: 'debitedAccount', as: 'accounts' });
Transaction.belongsTo(account_1.default, { foreignKey: 'creditedAccount', as: 'accounts' });
exports.default = Transaction;
