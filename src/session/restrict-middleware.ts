import {Request, Response} from 'express'

const RestrictMiddleWare = (req: Request, res: Response, next: Function) => {
    try {
        // if this throws, please don't crash my app
        if (req && req.session && req.session.user) {
            next();
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'you broke it!' });
    }
};
export default RestrictMiddleWare;