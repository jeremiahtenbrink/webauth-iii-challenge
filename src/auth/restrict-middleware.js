"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_1 = __importDefault(require("../api/secret"));
const RestrictMiddleWare = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jsonwebtoken_1.default.verify(token, secret_1.default.jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: "Invalid Credentials" });
            }
            else {
                req.body.decodedToken = decodedToken;
                next();
            }
        });
    }
    else {
        res.status(401).json({ message: "No token provided" });
    }
};
exports.default = RestrictMiddleWare;
//# sourceMappingURL=restrict-middleware.js.map