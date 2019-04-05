import { database } from '../../data/dbConfig';
import { IUser } from "./IUser";


export const getUsers = () => {
    return database( 'users' );
};

export const insertUser = ( user: IUser ) => {
    return database( 'users' ).insert( user );
};

export const getUserById = ( id: number ) => {
    return database( 'users' ).where( { id } ).first();
};

export const getUsersByEmail = ( email: string ) => {
    return database( 'users' ).where( { email } ).first();
};