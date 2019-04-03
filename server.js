"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const session_config_1 = __importDefault(require("./src/session/session-config"));
const logout_1 = __importDefault(require("./src/logout/logout"));
const login_1 = __importDefault(require("./src/login/login"));
const path = require('path');
const cors = require('cors');
const apiDocsPath = path.join(__dirname, './apidoc');
const Register = require('./src/register/register');
const Users = require('./src/users/users');
const server = express_1.default();
server.use(helmet_1.default());
server.use(cors());
server.use(body_parser_1.default.urlencoded({ extended: true }));
server.use(express_session_1.default(session_config_1.default));
server.use('/api/register', Register);
server.use('/api/login', login_1.default);
server.use('/api/logout', logout_1.default);
server.use('/api/users', Users);
server.use('/', express_1.default.static(apiDocsPath));
exports.default = server;
//# sourceMappingURL=server.js.map