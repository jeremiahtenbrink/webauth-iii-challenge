import { Request, Response } from "express";
import { IUser } from "./IUser";
import * as Users from './users-model';
import restricted from '../auth/restrict-middleware';

const usersRouter = require( 'express' ).Router();


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
usersRouter.get( '/', restricted, async ( req: Request, res: Response ) => {
    try {
        const users: IUser[] = await Users.getUsers();
        if ( users ) {
            let usersDisplay = users.map( user => {
                return {
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    address: user.address,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                }
            } );
            
            res.status( 200 ).json( usersDisplay );
            return;
        }
    } catch ( e ) {
        res.status( 500 ).json( e );
    }
    
    
} );

module.exports = usersRouter;
