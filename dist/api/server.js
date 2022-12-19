"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
require("dotenv/config");
const PORT = (_a = process.env.APP_PORT) !== null && _a !== void 0 ? _a : 3001;
new app_1.App().start(PORT);
