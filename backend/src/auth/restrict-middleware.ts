import {Request, Response} from 'express'
import jwt from 'jsonwebtoken';
import secret from '../api/secret';

const RestrictMiddleWare = (req: Request, res: Response, next: Function) => {
    const token = req.headers.authorization;
    
    if (token){
        jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({message: "Invalid Credentials"})
            }else {
                req.body.decodedToken  = decodedToken;
                next();
            }
            
        })
    }else {
        res.status(401).json({message: "No token provided"});
    }
};
export default RestrictMiddleWare;