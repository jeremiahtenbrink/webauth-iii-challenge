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
const Users = __importStar(require("./users-model"));
const restrict_middleware_1 = __importDefault(require("../auth/restrict-middleware"));
const usersRouter = require('express').Router();
/**
 * @api {get} /api/users/ Get all users
 * @apiVersion 1.0.0
 * @apiName GetUsers
 * @apiGroup Users
 * @apiPermission Users
 *
 * @apiExample Get users example:
 * axios.get('/api/users', options: {
 *     headers: {
 *         authorization: "User Token"
 *     }
 * });
 *
 * @apiHeader {string} authorization User auth token.
 *
 * @apiUse Error
 *
 * @apiSuccess {Number} id              ID of the user.
 * @apiSuccess {String} email           Users email.
 * @apiSuccess {String} first_name      Users first name.
 * @apiSuccess {String} last_name       Users last name.
 * @apiSuccess {String} address         Users street address.
 * @apiSuccess {String} created_at      Account created at date and time.
 * @apiSuccess {String} updated_at      Last time account was updated.
 * @apiSuccessExample {json} Example:
 *[
 *  {
        "id": 1,
        "email": "Nolan_Hackett@gmail.com",
        "first_name": "Diego",
        "last_name": "Dach",
        "address": "085 Considine Rue",
        "created_at": "2019-04-01 19:19:22",
        "updated_at": "2019-04-01 19:19:22"
    },
 {
        "id": 2,
        "email": "Edythe_Schaden@hotmail.com",
        "first_name": "Peter",
        "last_name": "Rath",
        "address": "16186 Green Bypass",
        "created_at": "2019-04-01 19:19:22",
        "updated_at": "2019-04-01 19:19:22"
    }
 *]
 *
 */
usersRouter.get('/', restrict_middleware_1.default, async (req, res) => {
    try {
        const users = await Users.getUsers();
        if (users) {
            let usersDisplay = users.map(user => {
                return {
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    address: user.address,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                };
            });
            res.status(200).json(usersDisplay);
            return;
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
});
module.exports = usersRouter;
//# sourceMappingURL=users.js.map