import express from "express";
import helmet from 'helmet';
import bodyParser from "body-parser";
import session from 'express-session';
import sessionConfig from './src/session/session-config';
import Logout from './src/logout/logout';
import Login from './src/login/login';

const path = require( 'path' );
const cors = require( 'cors' );
const apiDocsPath = path.join( __dirname, './apidoc' );

const Register = require( './src/register/register' );
const Users = require( './src/users/users' );


const server = express();


server.use( helmet() );
server.use( cors() );
server.use( bodyParser.urlencoded( { extended: true } ) );
server.use( session( sessionConfig ) );

server.use( '/api/register', Register );
server.use( '/api/login', Login );
server.use( '/api/logout', Logout );
server.use( '/api/users', Users );
server.use( '/', express.static( apiDocsPath ) );

export default server;