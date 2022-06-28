"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, HOST, POSTGRES_PORT, POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASS, POSTGRES_DB, } = process.env;
exports.default = {
    port: PORT,
    dbPort: POSTGRES_PORT,
    host: HOST,
    dbHost: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASS,
    database: POSTGRES_DB,
};
