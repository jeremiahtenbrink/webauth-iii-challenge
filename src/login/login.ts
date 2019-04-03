import { Request, Response } from "express";
import { ILogin } from "./ILogin";
import { error, sendError } from "../error/error";
import * as Users from '../users/users-model';
import bcrypt from 'bcrypt';
import { IUserFromDb } from "../users/IUser";


const usersRouter = require( 'express' ).Router();


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
usersRouter.post( '/', async ( req: Request, res: Response ) => {
    try {
        
        const login: ILogin = req.body;
        if ( !login.email || !login.password ) {
            sendError( error( 400, "You must send a password and email" +
                " address." ), res );
            return;
        }
        
        Users.getUsersByEmail( login.email ).then( ( user: IUserFromDb ) => {
            
            const samePassword = bcrypt.compareSync( login.password,
                user.password );
            

            if ( samePassword ) {
                // @ts-ignore
                req.session.user = user;
                res.status( 200 )
                    .json( { message: `Welcome ${ user.first_name }` } );
                return;
            }
            
            sendError( error( 401, "Invalid credentials" ), res );
        } ).catch( error => {
            sendError( error, res );
        } );
        
    } catch ( e ) {
        res.status( 500 ).json( e );
    }
    
} );

export default usersRouter;
