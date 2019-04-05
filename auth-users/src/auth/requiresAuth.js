import React from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3200/api";

axios.interceptors.request.use( requestConfig => {
    requestConfig.headers.authorization = localStorage.getItem( "token" );
    return requestConfig;
} );

export default function( Component ) {
    return class RequiresAuth extends React.Component {
        render() {
            const token = localStorage.getItem( "token" );
            const notLoggedIn = <h3>Please login to see the users</h3>;
            if ( !token ) {
                this.props.history.push( "/login" );
            }
            return <>{ token ? <Component { ...this.props }/>
                             : notLoggedIn }</>;
        }
    };
}

