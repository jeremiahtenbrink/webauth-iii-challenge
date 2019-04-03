import session from 'express-session';
import { database } from '../../data/dbConfig';

const KnexSessionStore = require( 'connect-session-knex' )( session );

const sessionConfig: session.SessionOptions = {
    name: 'monster', // defaults to sid
    secret: 'keep it secret, keep it safe!',
    cookie: {
        maxAge: 1000 * 60 * 10, // milliseconds
        secure: false, // use cookie over https
        httpOnly: true, // false means JS can access the cookie on the client
    },
    resave: false, // avoid recreating unchanged sessions
    saveUninitialized: false, // GDPR compliance
    store: new KnexSessionStore( {
        knex: database,
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 30, // delete expired sessions
    } ),
};

export default sessionConfig;