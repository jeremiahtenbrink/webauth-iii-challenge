import express from "express";
import helmet from 'helmet';
import bodyParser from "body-parser";

const path = require( 'path' );
const cors = require( 'cors' );
const apiDocsPath = path.join( __dirname, '../../apidoc' );

const Auth = require( '../auth/auth-router' );
const Users = require( '../users/users' );


const server = express();


server.use( helmet() );
server.use( cors() );
server.use( express.json() );
server.use( bodyParser.urlencoded( { extended: true } ) );


server.use( '/api/users', Users );
server.use( '/api/', Auth );
server.use( '/', express.static( apiDocsPath ) );

export default server;