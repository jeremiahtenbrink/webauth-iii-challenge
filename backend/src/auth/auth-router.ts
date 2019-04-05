import secret from '../api/secret';
import { error, sendError } from "../error/error";
import express, { Request, Response } from "express";
import { IUser, IUserFromDb } from "../users/IUser";
import * as Users from '../users/users-model';
import validator from "validator";
import bcrypt from "bcrypt";
import { ILogin } from "./ILogin";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

/**
 * @api {post} /api/register Register a user
 * @apiVersion 1.0.0
 * @apiName RegisterUser
 * @apiGroup Registration
 *
 * @apiExample Request example:
 * axios.post('/api/register', {
 *     firstName: "First Name",
 *     lastName: "Last Name",
 *     email: "emailAddress@gmail.com",
 *     address: "street address",
 *     password: "user password",
 * });
 *
 * @apiParam {String} firstName     Users first name.
 * @apiParam {String} lastName      Users last name.
 * @apiParam {String} email          Users email address.
 * @apiParam {String} address        Users street address.
 * @apiParam {String} password       Users password.
 *
 * @apiUse Error
 *
 * @apiSuccess {Number} id              ID of the new registered user.
 * @apiSuccess {String} first_name      Users first name.
 * @apiSuccess {String} last_name       Users last name.
 * @apiSuccess {String} email           Users email address.
 * @apiSuccess {String} address         Users street address.
 * @apiSuccess {Number} created_at      Timestamp the user was created.
 * @apiSuccess {Number} updated_at      Timestamp the user was updated.
 * @apiSuccessExample {json} Example:
 *  {
        "id": 1,
        "email": "Nolan_Hackett@gmail.com",
        "first_name": "Diego",
        "last_name": "Dach",
        "address": "085 Considine Rue",
        "created_at": "2019-04-01 19:19:22",
        "updated_at": "2019-04-01 19:19:22"
    }
 *
 *
 */
authRouter.post( '/register', async ( req: Request, res: Response ) => {
    try {
        
        let user = req.body;
        if ( !user.firstName || !user.lastName || !user.email ||
            !user.address ) {
            sendError( error( 400, "Please include all the user" +
                " details in the request body." ), res );
            return;
        }
        
        if ( !validator.isEmail( user.email ) ) {
            sendError(
                error( 400, "The email given is not a email" +
                    " address." ), res );
            return;
        }
        
        let userObject: IUser = {
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email.toLowerCase(),
            address: user.address,
            password: await bcrypt.hashSync( user.password, 14 )
        };
        
        const result = await Users.insertUser( userObject );
        if ( result ) {
            let user = await Users.getUserById( result[ 0 ] );
            res.status( 201 ).json( {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                address: user.address,
                email: user.email,
                created_at: user.created_at,
                updated_at: user.updated_at,
            } );
            return;
        }
        
        
    } catch ( e ) {
        res.status( 500 ).json( e );
    }
    
    
} );


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
 *     message: "Welcome first_name",
 *     token: "token",
 *     user: {
 *         id: number,
 *         email: string,
 *         reset_password_token?: string,
           password: string
           first_name: string,
           last_name: string,
           address: string,
           created_at: string,
           updated_at: string
 *     }
 *  }
 *
 *
 */
authRouter.post( '/login', async ( req: Request, res: Response ) => {
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
                const token = generateToken( user );
                res.status( 200 )
                    .json( {
                        message: `Welcome ${ user.first_name }`, token, user
                    } );
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


function generateToken( user: IUserFromDb ) {
    const payload = {
        subject: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address,
        created_at: user.created_at,
        updated_at: user.updated_at,
        roles: [ 'student', 'ta' ], // pretend they come from database user.roles
    };
    // removed the const secret from this line <<<<<<<<<<<<<<<<<<<<<<<
    const options = {
        expiresIn: '1d',
    };
    
    return jwt.sign( payload, secret.jwtSecret, options ); // returns valid token
}

module.exports = authRouter;