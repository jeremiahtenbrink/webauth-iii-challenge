"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = require("../../data/dbConfig");
const Users = __importStar(require("../users/users-model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = require("../error/error");
const uuid_1 = __importDefault(require("uuid"));
exports.login = async (login) => {
    const user = await Users.getUsersByEmail(login.email);
    const passwordMatch = bcrypt_1.default.compareSync(login.password, user.password);
    if (!passwordMatch) {
        throw error_1.error(401, "Invalid Credentials");
    }
    const record = await dbConfig_1.database('login').where({ email: login.email })
        .first();
    if (record) {
        const deleted = await dbConfig_1.database('login')
            .where({ email: login.email }).delete();
        if (!deleted) {
            throw error_1.error(500, "Internal server error");
        }
    }
    const token = uuid_1.default.v4();
    const ids = await dbConfig_1.database('login')
        .insert({ email: login.email, token });
    if (ids[0]) {
        return dbConfig_1.database('login')
            .select("token")
            .where({ email: login.email }).first();
    }
};
exports.isUserLoggedIn = async (token) => {
    let record = await dbConfig_1.database('login').where({ token }).first();
    return !!record;
};
//# sourceMappingURL=login-model.js.map