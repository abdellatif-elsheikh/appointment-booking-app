"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const rateLimit_middleware_1 = __importDefault(require("./middlewares/rateLimit.middleware"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const error_404_middleware_1 = __importDefault(require("./middlewares/error_404.middleware"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const app = (0, express_1.default)();
const PORT = config_1.default.port || 3000;
const HOST = config_1.default.host || 'localhost';
// Use main middlewares
app.use(express_1.default.json(), (0, morgan_1.default)('common'), (0, helmet_1.default)(), (0, cors_1.default)(), rateLimit_middleware_1.default);
app.get('/', (_req, res) => {
    res.status(200).json({
        message: 'welcome to appointment booking api',
    });
});
app.use('/api', index_route_1.default);
// ERROR 404 MIDDLEWARE
// ! THIS SHOULD BE ALWAYS AT THE END
app.use(error_middleware_1.default, error_404_middleware_1.default);
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`app is running at http://${HOST}:${PORT}`);
});
exports.default = app;
