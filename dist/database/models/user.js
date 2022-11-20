"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
// import Account from './account'
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.STRING
    }
    // accountId: {
    //   type: INTEGER,
    //   allowNull: false
    // }
}, {
    sequelize: _1.default,
    modelName: 'users',
    timestamps: false
});
// User.belongsTo(Account, { foreignKey: 'accountId', as: 'accounts' })
exports.default = User;
