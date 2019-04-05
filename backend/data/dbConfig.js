"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Knex = require("knex");
const kenexConfig = require('../knexfile').development;
exports.database = Knex(kenexConfig);
//# sourceMappingURL=dbConfig.js.map