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
const error_1 = require("../error/error");
const Users = __importStar(require("../users/users-model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const usersRouter = require('express').Router();
/**
 * @api {post} /api/login Log in a user
 * @apiVersion 1.0.0
 * @apiName LogInUser
 * @apiGroup Login
 *
 * @apiExample Post example:
 * axios.post('/api/login', {
 *     email: "usersEmailAddress@yahoo.com",
 *     password: "users password"
 * });
 *
 * @apiParam {String} email         The users email address.
 * @apiParam {string} password      The users password.
 *
 * @apiUse Error
 *
 * @apiSuccessExample {json} Example:
 *  {
 *     message: "Welcome first_name"
 *  }
 *
 *
 */
usersRouter.post('/', async (req, res) => {
    try {
        const login = req.body;
        if (!login.email || !login.password) {
            error_1.sendError(error_1.error(400, "You must send a password and email" +
                " address."), res);
            return;
        }
        Users.getUsersByEmail(login.email).then((user) => {
            const samePassword = bcrypt_1.default.compareSync(login.password, user.password);
            if (samePassword) {
                // @ts-ignore
                req.session.user = user;
                res.status(200)
                    .json({ message: `Welcome ${user.first_name}` });
                return;
            }
            error_1.sendError(error_1.error(401, "Invalid credentials"), res);
        }).catch(error => {
            error_1.sendError(error, res);
        });
    }
    catch (e) {
        res.status(500).json(e);
    }
});
exports.default = usersRouter;
//# sourceMappingURL=login.js.map