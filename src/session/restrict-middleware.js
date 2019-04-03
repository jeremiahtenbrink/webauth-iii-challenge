"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RestrictMiddleWare = (req, res, next) => {
    try {
        // if this throws, please don't crash my app
        if (req && req.session && req.session.user) {
            next();
        }
        else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'you broke it!' });
    }
};
exports.default = RestrictMiddleWare;
//# sourceMappingURL=restrict-middleware.js.map