import { Request, Response } from "express";
import { IUser } from "../users/IUser";
import * as Users from '../users/users-model';
import * as error from '../error/error';
import validator from "validator";
import bcrypt from "bcrypt";

const registerRouter = require( 'express' ).Router();

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
registerRouter.post( '/', async ( req: Request, res: Response ) => {
    try {
        
        let user = req.body;
        if ( !user.firstName || !user.lastName || !user.email ||
            !user.address ) {
            error.sendError( error.error( 400, "Please include all the user" +
                " details in the request body." ), res );
            return;
        }
        
        if ( !validator.isEmail( user.email ) ) {
            error.sendError(
                error.error( 400, "The email given is not a email" +
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

module.exports = registerRouter;
