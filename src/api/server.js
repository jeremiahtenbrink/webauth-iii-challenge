"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
const path = require('path');
const cors = require('cors');
const apiDocsPath = path.join(__dirname, '../../apidoc');
const Auth = require('../auth/auth-router');
const Users = require('../users/users');
const server = express_1.default();
server.use(helmet_1.default());
server.use(cors());
server.use(express_1.default.json());
server.use(body_parser_1.default.urlencoded({ extended: true }));
server.use('/api/users', Users);
server.use('/api/', Auth);
server.use('/', express_1.default.static(apiDocsPath));
exports.default = server;
//# sourceMappingURL=server.js.map