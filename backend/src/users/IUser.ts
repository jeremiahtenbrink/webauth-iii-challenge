export interface IUser {
    id?: number,
    password?: string,
    reset_password_token?: string,
    email: string,
    first_name: string,
    last_name: string,
    address: string,
    created_at?: number,
    updated_at?: number
}

export interface IUserFromDb {
    id?: number,
    password: string,
    reset_password_token?: string,
    email: string,
    first_name: string,
    last_name: string,
    address: string,
    created_at: string,
    updated_at: string
}