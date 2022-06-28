"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const PORT = config_1.default.port;
const HOST = config_1.default.host;
const notFound = (_req, res) => {
    res.status(404).json({
        message: `you are lost you can go back to Home http://${HOST}:${PORT}/`,
    });
};
exports.default = notFound;
