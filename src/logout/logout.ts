import express, { Request, Response } from 'express';

const router = express.Router();


/**
 * @api {get} /api/logout Log out a user
 * @apiVersion 1.0.0
 * @apiName LogOutUser
 * @apiGroup Login
 *
 * @apiExample Get example:
 * axios.get('/api/logout');
 *
 * @apiUse Error
 *
 * @apiSuccessExample {json} Success example:
 *  {
 *      status: 200,
 *     message: "Bye bye, thanks for playing."
 *  }
 *
 *
 */
router.get( '/', ( req: Request, res: Response ) => {
    if ( req.session ) {
        req.session.destroy( err => {
            if ( err ) {
                res.status( 500 ).json( {
                    message: "You can check out any time" +
                        " you like, but you can never leave."
                } )
            } else {
                res.status( 200 )
                    .json( {
                        status: 200, message: "Bye bye, thanks for" +
                            " playing."
                    } )
            }
        } )
    } else {
        res.status( 200 ).json( {
            status: 200, message: "Bye bye, thanks for" +
                " playing."
        } );
    }
    
} );

export default router;