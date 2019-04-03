"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const dbConfig_1 = require("../../data/dbConfig");
const KnexSessionStore = require('connect-session-knex')(express_session_1.default);
const sessionConfig = {
    name: 'monster',
    secret: 'keep it secret, keep it safe!',
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: dbConfig_1.database,
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 30,
    }),
};
exports.default = sessionConfig;
//# sourceMappingURL=session-config.js.map