"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = require("../../data/dbConfig");
exports.getUsers = () => {
    return dbConfig_1.database('users');
};
exports.insertUser = (user) => {
    return dbConfig_1.database('users').insert(user);
};
exports.getUserById = (id) => {
    return dbConfig_1.database('users').where({ id }).first();
};
exports.getUsersByEmail = (email) => {
    return dbConfig_1.database('users').where({ email }).first();
};
//# sourceMappingURL=users-model.js.map